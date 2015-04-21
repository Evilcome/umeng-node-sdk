var Class = require('arale').Class;
var crypto = require('crypto');
var _ = require('lodash');
var request = require('request');

// private sign function
function _sign(val) {
	return crypto.createHash('md5').update((val).toString(), 'UTF-8').digest('hex');
}

var Notification = Class.create({

	// the host
	_host: 'http://msg.umeng.com',

	// the upload path
	_uploadPath: '/upload',

	// the post path
	_postPath: '/api/send',

	// the app master secret
	_appMasterSecret: 'nuslg4drwbdu1odmmrdzcb9ll9pza7cl',

	/*
	 * $data is designed to construct the json string for POST request. Note:
	 * 1)The key/value pairs in comments are optional.  
	 * 2)The value for key 'payload' is set in the subclass(AndroidNotification or IOSNotification), as their payload structures are different.
	 */ 
	_data: null,

	//return TRUE if it's complete, otherwise throw exception with details
	isComplete: function() {
		if(!this._appMasterSecret) {
			return new Error('Please set your app master secret for generating the signature!');
		} 

		return this._checkArrayValues(this._data)
	},

	_checkArrayValues: function(obj) {
		for(var i in obj) {
			if(obj.hasOwnProperty(i)) {
				if(!obj[i]) {
					return new Error(i + ' is null!');
				}

				if(_.isObject(obj[i])) {
					return this._checkArrayValues(obj[i]);
				}
			}
		}

		return null;
	},

  initialize: function() {
  	this._data = {
			'appkey': '',
			'timestamp': '',
			'type': '',
			// 'device_tokens': '',
			// 'alias': '',
			// 'file_id': '',
			// 'filter': '',
			// 'policy': null,
			'production_mode': 'true',
			// 'feedback': '',
			// 'description': '',
			// 'thirdparty_id': ''
		};
  },

  send: function(cb) {

  	// check the fields to make sure that tyey are not null
  	var inComplete = this.isComplete();
  	if(inComplete) return cb(inComplete);

  	var url = this._host + this._postPath;
  	var sign = _sign('POST' + url + JSON.stringify(this._data) + this._appMasterSecret);

  	url = url + '?sign=' + sign;

  	// debug
  	console.log(url);
  	console.log(this._data);

  	request.post(url, this._data, cb);
  }
});

module.exports = Notification;

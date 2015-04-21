var Class = require('arale').Class;
var crypto = require('crypto');
var _ = require('lodash');
var request = require('request');

// private sign function
function _sign(val) {
	// console.log(val);
	return crypto.createHash('md5').update(val).digest('hex');
}

function _nativeConvertAscii(str) {
	var ascii = '';
	for(var i = 0; i != str.length; i++) {
		var code = Number(str[i].charCodeAt(0));
		if(code > 127) {
			charAscii = code.toString(16);
			charAscii = new String("0000").substring(charAscii.length, 4) + charAscii
			ascii += "\\u" + charAscii;
		} else {
			ascii += str[i]
		}
	}

	return ascii;
}

var Notification = Class.create({

	// the host
	_host: 'http://msg.umeng.com',

	// the upload path
	_uploadPath: '/upload',

	// the post path
	_postPath: '/api/send',

	// the app master secret
	_appMasterSecret: '',

	/*
	 * $data is designed to construct the json string for POST request. Note:
	 * 1)The key/value pairs in comments are optional.  
	 * 2)The value for key 'payload' is set in the subclass(AndroidNotification or IOSNotification), as their payload structures are different.
	 */ 
	_data: null,

	setAppMasterSecret: function(sec) {
		this._appMasterSecret = sec;
	},

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

  	// console.log(_nativeConvertAscii("aaa 中文"));
  	var data = JSON.stringify(this._data);
  	data = _nativeConvertAscii(data);
  	// this._data.payload.body.title = _nativeConvertAscii(this._data.payload.body.title);

  	// check the fields to make sure that tyey are not null
  	var inComplete = this.isComplete();
  	if(inComplete) return cb(inComplete);

  	// solve issure: http://bbs.umeng.com/thread-6928-1-1.html
  	// this.encodeChinese(this.data);

  	var url = this._host + this._postPath;
  	var sign = _sign('POST' + url + data + this._appMasterSecret);

  	url = url + '?sign=' + sign;
  	// debug
  	// console.log(url);
  	// console.log(this._data);

  	// use request-json can solve 1018 error
  	// var client = request.createClient(this._host);
  	// client.post(url, this._data, cb);

  	var options = {
		  url: url,
		  method: 'POST',
		  json: true,
		  headers: {
        "content-type": "application/json",
    	},
    	body: data
		};

		console.log(options);

		request(options, cb);
  }
});

module.exports = Notification;

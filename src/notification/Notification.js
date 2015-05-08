var Class = require('arale').Class;
var crypto = require('crypto');
var _ = require('lodash');
var http = require('http');
var url = require('url');

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

	getData: function() {
		return this._data;
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

  	// check the fields to make sure that tyey are not null
  	var inComplete = this.isComplete();
  	if(inComplete) return cb(inComplete);

  	// solve issure: http://bbs.umeng.com/thread-6928-1-1.html
  	var data = JSON.stringify(this._data);
  	data = _nativeConvertAscii(data);

  	var uri = this._host + this._postPath;
  	var sign = _sign('POST' + uri + data + this._appMasterSecret);

  	var options = {
		  host: url.parse(this._host).host,
		  path: this._postPath + '?sign=' + sign,
		  method: 'POST',
		  headers: {
        "content-type": "application/json",
        "Content-Length": data.length
    	}
		};

		var req = http.request(options, function(res) {
			res.setEncoding('utf-8');

		  var responseString = '';

		  res.on('data', function(data) {
		    responseString += data;
		  });

		  res.on('end', function() {
		  	var httpResponse = res.httpResponse;

		  	try{
		  		var resultObject = JSON.parse(responseString);	
		  		cb(null, res.httpResponse, resultObject);
		  	}catch(e) {
		  		cb(e, responseString);
		  	}
		  });
		});

		req.write(data);
		req.end();

		req.on('error', function(e) {
		  cb(e);
		});
  }
});

module.exports = Notification;

var Android = require('./notification/android');
var IOS = require('./notification/ios');
var Class = require('arale').Class;
var _ = require('lodash');

var Umeng = Class.create({

	_platform: '',
	_appKey: '',
	_appMasterSecret: '',

	broadcast: null,

	groupcast: null,

	unicast: null,

	_prepareNotification: function(notification, info, cb) {
		notification.setAppMasterSecret(this._appMasterSecret);

		var data = notification.getData();
		data.appkey = this._appKey;
		_.merge(data, info);

		notification.send(cb);
	},

	_prepareIOS: function() {
		this.broadcast = function(info, cb) {
			this._prepareNotification(new IOS.IOSBroadcast, info, cb);
		},

		this.groupcast = function(info, cb) {
			this._prepareNotification(new IOS.IOSGroupcast, info, cb);
		},

		this.unicast = function(info, cb) {
			this._prepareNotification(new IOS.IOSUnicast, info, cb);
		};
	},

	_prepareAndroid: function() {
		this.broadcast = function(info, cb) {
			this._prepareNotification(new Android.AndroidBroadcast, info, cb);
		},

		this.groupcast = function(info, cb) {
			this._prepareNotification(new Android.AndroidGroupcast, info, cb);
		},

		this.unicast = function(info, cb) {
			this._prepareNotification(new Android.AndroidUnicast, info, cb);
		};
	},

	initialize: function(option) {
		if(!option) throw new Error('lose option.');

		if(!option.platform && option.platform !== 'ios' && option.platform !== 'android') {
			throw new Error('platform must be ios or android.');
		}

		this._platform = option.platform;
  	this._appKey = option.appKey;
  	this._appMasterSecret = option.appMasterSecret;

  	if(this._platform === 'ios') {
  		this._prepareIOS();	
  	} else if(this._platform === 'android') {
  		this._prepareAndroid();	
  	}
  }

});

module.exports = Umeng;
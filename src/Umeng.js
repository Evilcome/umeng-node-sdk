var Android = require('./notification/android');
var IOS = require('./notification/ios');
var Class = require('arale').Class;
var _ = require('lodash');

var Umeng = Class.create({

	_platform: '',
	_appKey: '',
	_appMasterSecret: '',
	_aliseType: '',
	_iosAliseType: '',
	_androidAliseType: '',
	_productionMode: '',

	broadcast: null,

	groupcast: null,

	unicast: null,

	customizedcast: null,

	_prepareNotification: function(notification, info, cb) {
		notification.setAppMasterSecret(this._appMasterSecret);

		var data = notification.getData();

		data.appkey = this._appKey;
		data.production_mode = this._productionMode;

		_.merge(data, info);

		notification.send(cb);
	},

	_prepareIOS: function() {
		this.broadcast = function(info, cb) {
			this._prepareNotification(new IOS.IOSBroadcast, info, cb);
		};

		this.groupcast = function(info, cb) {
			this._prepareNotification(new IOS.IOSGroupcast, info, cb);
		};

		this.unicast = function(info, cb) {
			this._prepareNotification(new IOS.IOSUnicast, info, cb);
		};

		this.customizedcast = function(info, cb) {
			var notification = new IOS.IOSCustomizedcast;

			var aliseType = this._aliseType || this._iosAliseType;
			notification.setAliasType(aliseType);

			this._prepareNotification(notification, info, cb);
		};
	},

	_prepareAndroid: function() {
		this.broadcast = function(info, cb) {
			this._prepareNotification(new Android.AndroidBroadcast, info, cb);
		};

		this.groupcast = function(info, cb) {
			this._prepareNotification(new Android.AndroidGroupcast, info, cb);
		};

		this.unicast = function(info, cb) {
			this._prepareNotification(new Android.AndroidUnicast, info, cb);
		};

		this.customizedcast = function(info, cb) {
			var notification = new Android.AndroidCustomizedcast;

			var aliseType = this._aliseType || this._androidAliseType;
			notification.setAliasType(aliseType);

			this._prepareNotification(notification, info, cb);
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
  	this._aliseType = option.aliseType;
  	this._iosAliseType = option.iosAliseType;
  	this._androidAliseType = option.androidAliseType;
  	this._productionMode = option.productionMode || 'true';

  	if(this._platform === 'ios') {
  		this._prepareIOS();	
  	} else if(this._platform === 'android') {
  		this._prepareAndroid();	
  	}
  }

});

module.exports = Umeng;
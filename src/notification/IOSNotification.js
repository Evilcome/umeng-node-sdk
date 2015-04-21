var Notification = require('./Notification');

var IOSNotification = Notification.extend({

	// the array for payload, please see API doc for more information
	_iosPayload: {
		'aps': {
			'alert': '',
			// 'badge': 0,
			// 'sound': '',
			// 'content-available': 0,
			// 'category': ''
		},
		// 'foo': 'bar'
	},

	initialize: function() {
		IOSNotification.superclass.initialize.call(this);

		this._data['payload'] = this._iosPayload;
	}
});

module.exports = IOSNotification;
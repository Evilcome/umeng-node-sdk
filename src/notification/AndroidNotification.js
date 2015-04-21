var Notification = require('./Notification');

var AndroidNotification = Notification.extend({

	// the array for payload, please see API doc for more information
	_androidPayload: {
		'display_type': 'notification',
		'body': {
			'ticker': '',
			'title': '',
			'text': '',
			// 'icon': '',
			// 'largeIcon': '',
			'play_vibrate': 'true',
			'play_lights': 'true',
			'play_sound': 'true',
			'after_open': '',
			// 'url': '',
			// 'activity': '',
			// 'custom': ''
		},
		// 'extra': {
		// 	'foo': 'bar'
		// }
	},

	initialize: function() {
		AndroidNotification.superclass.initialize.call(this);

		this._data['payload'] = this._androidPayload;
	}
});

module.exports = AndroidNotification;
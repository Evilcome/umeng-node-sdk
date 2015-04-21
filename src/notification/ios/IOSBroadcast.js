var IOSNotification = require('../IOSNotification');

var IOSBroadcast = IOSNotification.extend({

	initialize: function() {
		IOSBroadcast.superclass.initialize.call(this);

		this._data['type'] = 'broadcast';
	}
});

module.exports = IOSBroadcast;
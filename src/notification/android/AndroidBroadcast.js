var AndroidNotification = require('../AndroidNotification');

var AndroidBroadcast = AndroidNotification.extend({

	initialize: function() {
		AndroidBroadcast.superclass.initialize.call(this);

		this._data['type'] = 'broadcast';
	}
});

module.exports = AndroidBroadcast;
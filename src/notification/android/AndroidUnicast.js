var AndroidNotification = require('../AndroidNotification');

var AndroidUnicast = AndroidNotification.extend({

	initialize: function() {
		AndroidUnicast.superclass.initialize.call(this);

		this._data['type'] = 'unicast';
		this._data['device_tokens'] = '';
	}
});

module.exports = AndroidUnicast;
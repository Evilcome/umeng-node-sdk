var IOSNotification = require('../IOSNotification');

var IOSUnicast = IOSNotification.extend({

	initialize: function() {
		IOSUnicast.superclass.initialize.call(this);

		this._data['type'] = 'unicast';
		this._data['device_tokens'] = '';
	}
});

module.exports = IOSUnicast;
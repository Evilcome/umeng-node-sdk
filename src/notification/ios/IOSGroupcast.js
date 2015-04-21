var IOSNotification = require('../IOSNotification');

var IOSGroupcast = IOSNotification.extend({

	initialize: function() {
		IOSGroupcast.superclass.initialize.call(this);

		this._data['type'] = 'groupcast';
		this._data['filter'] = null;
	}
});

module.exports = IOSGroupcast;
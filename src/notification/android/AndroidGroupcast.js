var AndroidNotification = require('../AndroidNotification');

var AndroidGroupcast = AndroidNotification.extend({

	initialize: function() {
		AndroidGroupcast.superclass.initialize.call(this);

		this._data['type'] = 'groupcast';
		this._data['filter'] = null;
	}
});

module.exports = AndroidGroupcast;
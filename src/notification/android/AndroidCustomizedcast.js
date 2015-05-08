var AndroidNotification = require('../AndroidNotification');

var AndroidCustomizedcast = AndroidNotification.extend({

	initialize: function() {
		AndroidCustomizedcast.superclass.initialize.call(this);

		this._data['type'] = 'customizedcast';
		this._data['alias_type'] = '';
	},

	setAliasType: function(type) {
		this._data['alias_type'] = type;
	}
	
});

module.exports = AndroidCustomizedcast;
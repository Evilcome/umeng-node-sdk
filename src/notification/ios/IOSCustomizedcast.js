var IOSNotification = require('../IOSNotification');

var IOSCustomizedcast = IOSNotification.extend({

	initialize: function() {
		IOSCustomizedcast.superclass.initialize.call(this);

		this._data['type'] = 'customizedcast';
		this._data['alias_type'] = '';
	},

	setAliasType: function(type) {
		this._data['alias_type'] = type;
	}
	
});

module.exports = IOSCustomizedcast;
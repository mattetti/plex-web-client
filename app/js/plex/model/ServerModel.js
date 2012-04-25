define(
	[
		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function () {
		var ServerModel = Backbone.Model.extend({
			idAttribute: 'machineIdentifier'
		});

		return ServerModel;
	}
);
define(
	[
		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function () {
		var ServerModel = Backbone.Model.extend({
			url: 'pms/servers',

			parse: function (response) {
				return $.xml2json(response);
			}
		});

		return ServerModel;
	}
);
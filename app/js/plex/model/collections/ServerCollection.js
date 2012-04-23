define(
	[
		'plex/model/ServerModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (ServerModel) {
		var SectionCollection = Backbone.Collection.extend({
			model: ServerModel,
			url: 'pms/servers',

			sync: function (method, model, options) {
				options.headers = {
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443
				};

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				var sections = $.xml2json(response);

				return sections.Server;
			}
		});

		return SectionCollection;
	}
);
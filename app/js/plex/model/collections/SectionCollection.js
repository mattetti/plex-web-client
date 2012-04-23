define(
	[
		'plex/model/SectionModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (SectionModel) {
		var SectionCollection = Backbone.Collection.extend({
			model: SectionModel,
			url: 'pms/system/library/sections',

			sync: function (method, model, options) {
				options.headers = {
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443
				};

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				return $.xml2json(response).Directory;
			}
		});

		return SectionCollection;
	}
);
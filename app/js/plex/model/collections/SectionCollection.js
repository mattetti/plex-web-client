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
				options.myPlex = true;

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				return $.xml2json(response).Directory;
			}
		});

		return SectionCollection;
	}
);
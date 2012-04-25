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
			url: 'library/sections',

			parse: function (response) {
				return $.xml2json(response).Directory;
			}
		});

		return SectionCollection;
	}
);
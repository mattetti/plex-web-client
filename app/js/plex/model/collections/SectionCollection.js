define(
	[
		'use!backbone',
		'use!xml2json',
		'plex/model/SectionModel'
	],

	function (Backbone, $, SectionModel) {
		var SectionCollection = Backbone.Collection.extend({
			model: SectionModel,
			url: 'library/sections',

			parse: function (response) {
				var sections = $.xml2json(response);

				return sections.Directory;
			}
		});

		return SectionCollection;
	}
);
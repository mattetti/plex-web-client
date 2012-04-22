define(
	[
		'use!backbone',
		'plex/model/SectionModel'
	],

	function (Backbone, SectionModel) {
		var SectionCollection = Backbone.Collection.extend({
			model: SectionModel,
			url: 'library/sections'
		});

		return SectionCollection;
	}
);
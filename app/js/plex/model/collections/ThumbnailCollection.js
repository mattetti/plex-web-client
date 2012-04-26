define(
	[
		'plex/model/ThumbnailModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (ThumbnailModel) {
		var SectionCollection = Backbone.Collection.extend({
			model: ThumbnailModel,
			url: 'pms/system/library/sections',

			sync: function (method, model, options) {
				options.myPlex = true;

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				var sections = $.xml2json(response).Directory;
				var i = sections.length;
				var thumbnails = [];

				while(i--) {
					var thumbs = sections[i].Thumb;

					_.each(thumbs, function (thumb) {
						thumb.machineIdentifier = sections[i].machineIdentifier;
					});

					thumbnails = _.union(thumbnails, thumbs);
				}

				return thumbnails;
			}
		});

		return SectionCollection;
	}
);
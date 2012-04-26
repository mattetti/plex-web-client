define(
	[
		'plex/model/collections/ThumbnailCollection',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (ThumbnailCollection) {
		var ServerModel = Backbone.Model.extend({
			idAttribute: 'machineIdentifier',
			thumbnails: new ThumbnailCollection()
		});

		return ServerModel;
	}
);
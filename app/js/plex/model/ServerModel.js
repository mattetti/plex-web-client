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

			initialize: function () {
				// Instantiate a collection in initialize because defaults are applied
				// to the prototype
				this.set('thumbnails', new ThumbnailCollection());
			}
		});

		return ServerModel;
	}
);
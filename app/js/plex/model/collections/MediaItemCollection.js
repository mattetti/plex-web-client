define(
	[
		'plex/model/MediaItemModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (MediaItemModel) {
		var MediaItemCollection = Backbone.Collection.extend({
			model: MediaItemModel,
			myPlex: false,

			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				var json = $.xml2json(response);

				if (typeof(json.Video) !== 'undefined') {
					return json.Video;
				} else if (typeof(json.Track) !== 'undefined') {
					return json.Track;
				} else {
					return json.Directory;
				}
			}
		});

		return MediaItemCollection;
	}
);
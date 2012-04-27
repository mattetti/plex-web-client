define(
	[
		'plex/model/VideoModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (VideoModel) {
		var VideoCollection = Backbone.Collection.extend({
			model: VideoModel,

			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				return $.xml2json(response).Video;
			}
		});

		return VideoCollection;
	}
);
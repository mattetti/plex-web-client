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
			myPlex: false,

			initialize: function (options) {
				this.url = options.url;
				this.myPlex = options.myPlex;
			},

			sync: function (method, model, options) {
				options.myPlex = this.myPlex;

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				return $.xml2json(response).Video;
			}
		});

		return VideoCollection;
	}
);
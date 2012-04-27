define(
	[
		'plex/model/VideoModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (VideoModel) {
		var QueueCollection = Backbone.Collection.extend({
			model: VideoModel,
			url: 'pms/playlists/queue/all',

			sync: function (method, model, options) {
				options.myPlex = true;

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				return $.xml2json(response).Video;
			},

			watched: function () {
				return this.filter(function (video) { return (video.get('viewCount') > 0); });
			},

			unwatched: function () {
				return this.filter(function (video) { return (video.get('viewCount') == 0); });
			}
		});

		return QueueCollection;
	}
);
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
			cachedModels: undefined,

			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				return $.xml2json(response).Video;
			},

			search: function (input) {
				var regex = new RegExp(input, 'i');

				return this.filter(function (item) {
					return regex.test(item.get('title'));
				});
			}
		});

		return VideoCollection;
	}
);
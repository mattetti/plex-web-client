define(
	[
		'plex/model/MediaDirectoryModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (MediaDirectoryModel) {
		var MediaDirectoryCollection = Backbone.Collection.extend({
			model: MediaDirectoryModel,
			myPlex: false,

			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				return $.xml2json(response).Directory;
			}
		});

		return MediaDirectoryCollection;
	}
);
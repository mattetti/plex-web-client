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
			},

			search: function (input) {
				var regex = new RegExp(input, 'i');

				return this.filter(function (item) {
					return regex.test(item.get('title'));
				});
			}
		});

		return MediaDirectoryCollection;
	}
);
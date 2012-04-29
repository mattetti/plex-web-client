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

				return this.filter(function (video) {
					return regex.test(video.get('title'));
				});
			},

			all: function () {
				this.comparator = function (video) {
					return video.get('title');
				};

				this.sort();

				return this.models;
			},

			added: function () {
				this.comparator = function (video) {
					return video.get('addedAt') * -1;
				};

				this.sort();

				return this.models;
			},

			rated: function () {
				this.comparator = function (video1, video2) {
					var rating1 = video1.get('rating');
					var rating2 = video2.get('rating');

					if (rating1 == rating2) {
						return 0;
					} else if (!rating1 || rating2 > rating1) {
						return 1;
					} else {
						return -1;
					}
				};

				this.sort();

				return this.models;
			}
		});

		return MediaDirectoryCollection;
	}
);
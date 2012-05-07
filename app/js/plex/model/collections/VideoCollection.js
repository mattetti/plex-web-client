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
				if (typeof(options) !== 'undefined') {
					this.url = options.url;
				}
			},

			parse: function (response) {
				return $.xml2json(response).Video;
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

			released: function () {
				this.comparator = function (video1, video2) {
					var date1 = Date.parse(video1.get('originallyAvailableAt'));
					var date2 = Date.parse(video2.get('originallyAvailableAt'));

					if (date1 == date2) {
						return 0;
					} else if (!date1 || date2 > date1) {
						return 1;
					} else {
						return -1;
					}
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
			},

			watched: function () {
				return this.filter(function (video) { return (video.get('viewCount') > 0); });
			},

			unwatched: function () {
				return this.filter(function (video) { return !video.get('viewCount'); });
			},

			next: function () {
				this.comparator = function (video1, video2) {
					var date1 = Date.parse(video1.get('originallyAvailableAt'));
					var date2 = Date.parse(video2.get('originallyAvailableAt'));

					if (date1 == date2) {
						return 0;
					} else if (!date2 || date1 > date2) {
						return 1;
					} else {
						return -1;
					}
				};

				this.sort();

				return _.first(this.unwatched());
			}
		});

		return VideoCollection;
	}
);
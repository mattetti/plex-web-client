define(
	[
		'plex/model/TrackModel',

		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function (TrackModel) {
		var TrackCollection = Backbone.Collection.extend({
			model: TrackModel,

			initialize: function (options) {
				if (typeof(options) !== 'undefined') {
					this.url = options.url;
				}
			},

			parse: function (response) {
				return $.xml2json(response).Track;
			}
		});

		return TrackCollection;
	}
);
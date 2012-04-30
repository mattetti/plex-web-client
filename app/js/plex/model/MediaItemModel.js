define(
	[
		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function () {
		var MediaItemModel = Backbone.Model.extend({
			initialize: function (options) {
				this.url = options.url;
			},

			parse: function (response) {
				return $.xml2json(response).Video;
			}
		});

		return MediaItemModel;
	}
);
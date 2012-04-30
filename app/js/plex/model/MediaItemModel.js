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
				var json = $.xml2json(response);

				if (typeof(json.Video) !== 'undefined') {
					return json.Video;
				} else {
					return json.Directory;
				}
			}
		});

		return MediaItemModel;
	}
);
define(
	[
		'use!backbone',
		'use!xml2json'
	],

	function (Backbone, $) {
		var ServerModel = Backbone.Model.extend({
			url: '',

			parse: function (response) {
				return $.xml2json(response);
			}
		});

		return ServerModel;
	}
);
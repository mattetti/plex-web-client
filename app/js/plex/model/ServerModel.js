define(
	[
		'use!backbone'
	],

	function (Backbone) {
		var ServerModel = Backbone.Model.extend({
			url: '',
			
			parse: function (response) {
				console.log(respose);
			}
		});

		return ServerModel;
	}
);
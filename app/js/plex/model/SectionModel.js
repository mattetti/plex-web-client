define(
	[
		'use!backbone'
	],

	function (Backbone) {
		var SectionModel = Backbone.Model.extend({
			parse: function (response) {
				console.log(respose);
			}
		});

		return SectionModel;
	}
);
define(
	[
		// Globals
		'use!backbone'
	],

	function () {
		var SectionModel = Backbone.Model.extend({
			idAttribute: 'key'
		});

		return SectionModel;
	}
);
define(
	[
		// Globals
		'use!backbone'
	],

	function () {
		var MediaDirectoryModel = Backbone.Model.extend({
			idAttribute: 'ratingKey'
		});

		return MediaDirectoryModel;
	}
);
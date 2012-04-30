define(
	[
		// Globals
		'use!backbone'
	],

	function () {
		var VideoModel = Backbone.Model.extend({
			idAttribute: 'ratingKey'
		});

		return VideoModel;
	}
);
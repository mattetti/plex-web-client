define(
	[
		// Globals
		'use!backbone'
	],

	function () {
		var TrackModel = Backbone.Model.extend({
			idAttribute: 'ratingKey'
		});

		return TrackModel;
	}
);
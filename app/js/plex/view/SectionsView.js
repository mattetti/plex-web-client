define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width',

			events: {
			},

			initialize: function () {
			},
			
			render: function () {
				this.$el.html('Sections');

				return this;
			}
		});

		return ServersView;
	}
);
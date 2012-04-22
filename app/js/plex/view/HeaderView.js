define(
	[
		'text!plex/view/templates/HeaderView.tpl',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {
		var HeaderView = BaseView.extend({
			tagName: 'header',
			
			template: Handlebars.compile(template),

			events: {
			},
			
			render: function () {
				this.$el.html(this.template());

				return this;
			}
		});

		return HeaderView;
	}
);
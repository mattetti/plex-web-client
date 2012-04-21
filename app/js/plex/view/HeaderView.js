define(
	[
		'jquery', 
		'use!backbone',
		'use!handlebars',
		'text!plex/view/templates/HeaderView.tpl',
		'plex/view/BaseView'
	],

	function ($, Backbone, Handlebars, template, BaseView) {
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
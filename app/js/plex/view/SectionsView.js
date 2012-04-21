define(
	[
		'jquery', 
		'use!backbone',
		'use!handlebars',
		'text!plex/view/templates/SectionsView.tpl',
		'plex/view/BaseView'
	],

	function ($, Backbone, Handlebars, template, BaseView) {
		var SectionsView = BaseView.extend({
			tagName: 'section',
			className: 'content',
			
			template: Handlebars.compile(template),

			events: {
			},
			
			render: function () {
				this.$el.html(this.template());

				return this;
			}
		});

		return SectionsView;
	}
);
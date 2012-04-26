define(
	[
		'text!templates/LoadingView.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],

	function (template, BaseView) {
		var HeaderView = BaseView.extend({
			className: 'loading',
			
			template: Handlebars.compile(template),
			
			render: function () {
				this.$el.html(this.template());

				return this;
			}
		});

		return HeaderView;
	}
);
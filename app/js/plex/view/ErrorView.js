define(
	[
		'text!templates/ErrorView.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {

		var tpl = Handlebars.compile(template);

		var ErrorView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			render: function () {
				this.$el.html(tpl());

				return this;
			}
		});

		return ErrorView;
	}
);
define(
	[
		'text!templates/LoadingView.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],

	function (template, BaseView) {

		var tpl = Handlebars.compile(template);

		var LoadingView = BaseView.extend({
			className: 'alert-smoke loading',
			
			render: function () {
				this.$el.html(tpl());

				return this;
			}
		});

		return LoadingView;
	}
);
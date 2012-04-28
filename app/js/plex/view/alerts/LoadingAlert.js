define(
	[
		'text!templates/alerts/LoadingAlert.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {

		var tpl = Handlebars.compile(template);

		var LoadingAlert = BaseView.extend({
			className: 'alert-smoke loading',
			
			render: function () {
				this.$el.html(tpl());

				return this;
			}
		});

		return LoadingAlert;
	}
);
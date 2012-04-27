define(
	[
		'text!templates/LoginView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var LoginView = BaseView.extend({
			tagName: 'section',
			className: 'content login',

			events: {
				'submit #login-form': 'onLoginSubmit'
			},
			
			render: function () {
				this.$el.html(tpl());

				return this;
			},

			onLoginSubmit: function (event) {
				event.preventDefault();

				dispatcher.trigger('command:Login',	this.$('input[name=username]').val(),
													this.$('input[name=password]').val());
			}
		});

		return LoginView;
	}
);
define(
	[
		'text!templates/LoginView.tpl',
		'plex/control/Dispatcher',
		'plex/control/signals/LoginSignal',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, loginSignal, appModel, BaseView) {

		var LoginView = BaseView.extend({
			tagName: 'section',
			className: 'content login',
			
			template: Handlebars.compile(template),

			events: {
				'submit #login-form': 'onLoginSubmit'
			},
			
			render: function () {
				this.$el.html(this.template());

				return this;
			},

			onLoginSubmit: function (event) {
				event.preventDefault();

				loginSignal.dispatch(	this.$('input[name=username]').val(), 
										this.$('input[name=password]').val());
			}
		});

		return LoginView;
	}
);
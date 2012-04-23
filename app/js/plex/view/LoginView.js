define(
	[
		'text!plex/view/templates/LoginView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView) {
		var user = appModel.get('user');
		var servers = appModel.get('servers');

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

				user.set({
					username: this.$('input[name=username]').val(),
					password: this.$('input[name=password]').val()
				});

				// TODO: Restructure this or extract into command
				user.fetch({
					success: function (response) {
						appModel.set('authenticated', true);

						servers.fetch({
							success: function (response) {
								dispatcher.trigger('navigate:servers');
							},
							error: function (xhr, status, error) {
								console.log('servers error');
							}
						});
					},
					error: function (xhr, status, error) {
						console.log('user error');
					}
				});
			}
		});

		return LoginView;
	}
);
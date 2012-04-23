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

				//appModel.get('server').fetch();
				//appModel.get('sections').fetch();

				$.ajax({
					type: 'POST',
					url: '/api/users/sign_in.xml',
					headers: {
						'Authorization': 'Basic ' + window.btoa(user.get('username') + ':' + user.get('password')),
						'X-Plex-Proxy-Host': 'my.plexapp.com',
						'X-Plex-Proxy-Port': 80,
						'X-Plex-Platform': 'MacOSX',
						'X-Plex-Platform-Version': '10.6.8',
						'X-Plex-Provides': 'player, controller',
						'X-Plex-Product': 'Web Client',
						'X-Plex-Version': '0.0.1',
						'X-Plex-Device': 'Macbook Pro',
						'X-Plex-Client-Identifier': '0987654321'
					},
					success: function (response) {
						console.log('success');
					},
					error: function (xhr, status, error) {
						console.log('error');
					}
				})

				//dispatcher.trigger('navigate:sections');
			}
		});

		return LoginView;
	}
);
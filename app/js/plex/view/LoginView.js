define(
	[
		'jquery', 
		'use!backbone',
		'use!handlebars',
		'text!plex/view/templates/LoginView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView'
	],

	function ($, Backbone, Handlebars, template, dispatcher, appModel, BaseView) {
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

				appModel.set({
					address: this.$('input[name=address]').val(),
					token: this.$('input[name=token]').val()
				});

				dispatcher.trigger('navigate:sections');
			}
		});

		return LoginView;
	}
);
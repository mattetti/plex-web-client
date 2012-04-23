define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/SectionsView',

		// Globals
		'use!backbone'
	],

	function (dispatcher, appModel, AppView, LoginView, SectionsView) {
		var Router = Backbone.Router.extend({
			postAuth: undefined,
			postAuthArgs: undefined,

			routes: {
				'': 'login',
				'!/login': 'login',
				'!/sections': 'sections',
				'*404': 'error'
			},
			
			initialize: function () {
				new AppView();

				Backbone.history.start();

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:sections', this.onNavigateSections, this);
			},

			isAuthenticated: function (callback, args) {
				// Kick the user out if we don't have an ip address
				if (appModel.get('authenticated') !== true) {

					// Store where the user was trying to go
					this.postAuth = callback;
					this.postAuthArgs = args;

					// Go to the login screen
					this.onNavigateLogin();

					return false;
				} else {
					return true;
				}
			},

			// Route Methods
			login: function () {
				appModel.set({
					showHeader: false,
					view: new LoginView()
				});
			},

			sections: function () {
				if (this.isAuthenticated(this.spaces) === true) {
					appModel.set({
						showHeader: true,
						view: new SectionsView()
					});
				}
			},

			error: function () {
			},

			// Navigate Methods
			onNavigateLogin: function () {
				this.navigate('!/login', {trigger: true});
			},

			onNavigateSections: function () {
				this.navigate('!/sections', {trigger: true});
			}
		});

		return Router;
	}
);
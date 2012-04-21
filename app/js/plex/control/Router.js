define(
	[
		'jquery',
		'use!backbone',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/SectionsView'
	],

	function ($, Backbone, dispatcher, appModel, AppView, LoginView, SectionsView) {
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
				if (typeof(appModel.get('address')) === 'undefined') {

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
				if (typeof(appModel.get('address')) === 'undefined') {
					appModel.set('view', new LoginView());
				} else {
					this.sections();
				}
			},

			sections: function () {
				if (this.isAuthenticated(this.spaces) === true) {
					appModel.set('view', new SectionsView());
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
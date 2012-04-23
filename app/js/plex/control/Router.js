define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/ServersView',
		'plex/view/SectionsView',

		// Globals
		'use!backbone'
	],

	function (dispatcher, appModel, AppView, LoginView, ServersView, SectionsView) {
		var Router = Backbone.Router.extend({
			postAuth: undefined,
			postAuthArgs: undefined,

			routes: {
				'': 'login',
				'!/login': 'login',
				'!/servers': 'servers',
				'!/servers/:id': 'sections',
				'*404': 'error'
			},
			
			initialize: function () {
				new AppView();

				Backbone.history.start();

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:servers', this.onNavigateServers, this);
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

			servers: function () {
				if (this.isAuthenticated(this.servers) === true) {
					appModel.set({
						showHeader: true,
						view: new ServersView()
					});
				}
			},

			sections: function () {
				if (this.isAuthenticated(this.sections) === true) {
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

			onNavigateServers: function () {
				this.navigate('!/servers', {trigger: true});
			},

			onNavigateSections: function (id) {
				this.navigate('!/servers/' + id, {trigger: true});
			}
		});

		return Router;
	}
);
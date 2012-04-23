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
		var servers = appModel.get('servers');
		var sections = appModel.get('sections');

		var Router = Backbone.Router.extend({
			postAuth: undefined,
			postAuthArgs: undefined,

			routes: {
				'': 'login',
				'!/login': 'login',
				'!/servers': 'servers',
				'!/servers/:serverID': 'sections',
				'*404': 'error'
			},
			
			initialize: function () {
				new AppView();

				Backbone.history.start();

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:servers', this.onNavigateServers, this);
				dispatcher.on('navigate:sections', this.onNavigateSections, this);

				appModel.on('change:authenticated', this.onAuthenticated, this);
			},

			isAuthenticated: function (callback, args) {
				// Kick the user out if we don't have an ip address
				if (appModel.get('authenticated') !== true) {

					// Store where the user was trying to go
					this.postAuth = callback;
					this.postAuthArgs = args;

					// Go to the login screen
					this.login();

					return false;
				} else {
					return true;
				}
			},

			onAuthenticated: function (model, authenticated) {
				if (authenticated === true) {
					if (typeof(this.postAuth) === 'undefined') {
						dispatcher.trigger('navigate:servers');
					} else {
						this.postAuth.apply(this, this.postAuthArgs);
					}
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
				if (this.isAuthenticated(this.servers, arguments) === true) {
					appModel.set({
						showHeader: true,
						view: new ServersView(),
						server: undefined
					});
				}
			},

			sections: function () {
				var serverID = arguments[0];
				
				if (this.isAuthenticated(this.sections, arguments) === true) {
					appModel.set({
						showHeader: true,
						view: new SectionsView(),
						server: servers.get(serverID)
					});
				}
			},

			error: function () {
				console.log('404');
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
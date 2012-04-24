define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/ServersView',
		'plex/view/SectionsView',
		'plex/view/MediaView',

		// Globals
		'use!backbone'
	],

	function (dispatcher, appModel, AppView, LoginView, ServersView, SectionsView, MediaView) {
		var servers = appModel.get('servers');
		var sections = appModel.get('sections');

		var Router = Backbone.Router.extend({
			postAuth: undefined,
			postAuthArgs: undefined,

			routes: {
				'': 'login',
				'!/login': 'login',
				'!/servers': 'servers',
				'!/servers/:serverID/sections': 'sections',
				'!/servers/:serverID/sections/:sectionID/list': 'list',
				'*404': 'error'
			},
			
			initialize: function () {
				new AppView().render();

				Backbone.history.start();

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:servers', this.onNavigateServers, this);
				dispatcher.on('navigate:sections', this.onNavigateSections, this);
				dispatcher.on('navigate:list', this.onNavigateList, this);

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
					authenticated: false,
					showHeader: false,
					view: new LoginView(),
					server: undefined,
					section: undefined
				});
			},

			servers: function () {
				if (this.isAuthenticated(this.servers, arguments) === true) {
					appModel.set({
						showHeader: true,
						view: new ServersView(),
						server: undefined,
						section: undefined
					});
				}
			},

			sections: function () {
				var serverID = arguments[0];
				
				if (this.isAuthenticated(this.sections, arguments) === true) {
					// Set the active server silently so the header doesn't update until we're ready
					appModel.set('server', servers.get(serverID), {silent: true});

					sections.fetch({
						success: function (response) {
							appModel.set({
								loading: false,
								showHeader: true,
								view: new SectionsView(),
								section: undefined
							});
						},

						error: function (xhr, status, error) {

						}
					});
				}
			},

			list: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var section = sections.get(sectionID);

				if (this.isAuthenticated(this.list, arguments) === true) {
					// Set the active server silently so the header doesn't update until we're ready
					appModel.set('server', servers.get(serverID), {silent: true});

					if (typeof(section) === 'object') {
						appModel.set({
							showHeader: true,
							view: new MediaView(),
							section: section
						});
					} else {
						sections.fetch({
							success: function (response) {
								section = response.get(sectionID);

								appModel.set({
									loading: false,
									showHeader: true,
									view: new MediaView(),
									section: section
								});
							},

							error: function (xhr, status, error) {

							}
						});
					}
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

			onNavigateSections: function (serverID) {
				this.navigate('!/servers/' + serverID + '/sections/', {trigger: true});
			},

			onNavigateList: function (serverID, sectionID) {
				this.navigate('!/servers/' + serverID + '/sections/' + sectionID + '/list', {trigger: true});
			}
		});

		return Router;
	}
);
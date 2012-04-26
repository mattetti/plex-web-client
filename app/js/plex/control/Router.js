define(
	[
		'plex/control/Dispatcher',
		'plex/control/signals/ShowLoadingSignal',
		'plex/control/signals/GetQueueSignal',
		'plex/control/signals/GetSectionsSignal',
		'plex/control/signals/GetMediaListSignal',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/ServersView',
		'plex/view/ErrorView',

		// Globals
		'use!backbone'
	],

	function (dispatcher, showLoadingSignal, getQueueSignal, getSectionsSignal, getMediaListSignal, appModel, AppView, LoginView, ServersView, ErrorView) {
		
		var queue = appModel.get('queue');
		var servers = appModel.get('servers');
		var sections = appModel.get('sections');

		var Router = Backbone.Router.extend({
			postAuth: undefined,
			postAuthArgs: undefined,

			routes: {
				'': 'login',
				'!/login': 'login',
				'!/queue': 'queue',
				'!/servers': 'servers',
				'!/servers/:serverID/sections': 'sections',
				'!/servers/:serverID/sections/:sectionID/list': 'list',
				'!/servers/:serverID/sections/:sectionID/details/:itemID': 'details',
				'!/servers/:serverID/sections/:sectionID/player/:itemID': 'player',
				'*404': 'error'
			},
			
			initialize: function () {
				new AppView().render();

				Backbone.history.start();

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:queue', this.onNavigateQueue, this);
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

						// Reset postAuth in case user logs out again
						this.postAuth = undefined;
						this.postAuthArgs = undefined;
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

			queue: function () {
				if (this.isAuthenticated(this.queue, arguments) === true) {
					getQueueSignal.dispatch();
				}
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
					appModel.set('server', servers.get(serverID));

					getSectionsSignal.dispatch();
				}
			},

			list: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];

				if (this.isAuthenticated(this.list, arguments) === true) {
					appModel.set('server', servers.get(serverID));

					getMediaListSignal.dispatch(sectionID);
				}
			},

			details: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var itemID = arguments[2];

				if (this.isAuthenticated(this.list, arguments) === true) {
					appModel.set('server', servers.get(serverID));
				}
			},

			player: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var itemID = arguments[2];

				if (this.isAuthenticated(this.list, arguments) === true) {
					appModel.set('server', servers.get(serverID));
				}
			},

			error: function () {
				appModel.set({
					showHeader: false,
					view: new ErrorView(),
					server: undefined,
					section: undefined
				});
			},

			// Navigate Methods
			onNavigateLogin: function () {
				this.navigate('!/login', {trigger: true});
			},

			onNavigateQueue: function () {
				this.navigate('!/queue', {trigger: true});
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
define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/AppView',
		'plex/view/LoginView',
		'plex/view/ServersView',
		'plex/view/ErrorView',

		// Globals
		'use!backbone'
	],

	function (dispatcher, appModel, AppView, LoginView, ServersView, ErrorView) {
		
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
				'!/servers/:serverID/sections/:sectionID/details/:itemID/season/:seasonID': 'season',
				'!/servers/:serverID/sections/:sectionID/details/:itemID': 'details',
				'!/servers/:serverID/sections/:sectionID/player/:itemID': 'player',
				'!/servers/:serverID/sections/:sectionID/list': 'list',
				'*404': 'error'
			},
			
			initialize: function () {
				this.bind('all', this.track);

				dispatcher.on('navigate:login', this.onNavigateLogin, this);
				dispatcher.on('navigate:queue', this.onNavigateQueue, this);
				dispatcher.on('navigate:servers', this.onNavigateServers, this);
				dispatcher.on('navigate:sections', this.onNavigateSections, this);
				dispatcher.on('navigate:list', this.onNavigateList, this);
				dispatcher.on('navigate:details', this.onNavigateDetails, this);
				dispatcher.on('navigate:show', this.onNavigateShow, this);
				dispatcher.on('navigate:season', this.onNavigateSeason, this);
				dispatcher.on('navigate:player', this.onNavigatePlayer, this);

				appModel.on('change:authenticated', this.onAuthenticated, this);

				new AppView().render();

				Backbone.history.start();
			},

			track: function () {
				if (typeof(_gaq) !== 'undefined') {
					var url = Backbone.history.getFragment();
					return _gaq.push(['_trackPageview', '/' + url]);
				}
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
					section: undefined,
					item: undefined,
					childID: undefined
				});
			},

			queue: function () {
				if (this.isAuthenticated(this.queue, arguments) === true) {
					dispatcher.trigger('command:GetQueue');
				}
			},

			servers: function () {
				if (this.isAuthenticated(this.servers, arguments) === true) {
					appModel.set({
						showHeader: true,
						view: new ServersView(),
						server: undefined,
						section: undefined,
						item: undefined,
						childID: undefined
					});

					dispatcher.trigger('command:GetServers');
				}
			},

			sections: function () {
				var serverID = arguments[0];
				
				if (this.isAuthenticated(this.sections, arguments) === true) {
					appModel.set('server', servers.get(serverID));

					dispatcher.trigger('command:GetSections', serverID);
				}
			},

			list: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];

				if (this.isAuthenticated(this.list, arguments) === true) {
					appModel.set('server', servers.get(serverID));

					dispatcher.trigger('command:GetMediaList', sectionID);
				}
			},

			details: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var itemID = arguments[2];

				if (this.isAuthenticated(this.details, arguments) === true) {
					appModel.set('server', servers.get(serverID));

					dispatcher.trigger('command:GetMediaDetails', sectionID, itemID);
				}
			},

			season: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var itemID = arguments[2];
				var seasonID = arguments[3];

				if (this.isAuthenticated(this.season, arguments) === true) {
					appModel.set({
						server: servers.get(serverID),
						childID: seasonID
					});

					dispatcher.trigger('command:GetMediaDetails', sectionID, itemID);
				}
			},

			player: function () {
				var serverID = arguments[0];
				var sectionID = arguments[1];
				var itemID = arguments[2];

				if (this.isAuthenticated(this.player, arguments) === true) {
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
			},

			onNavigateDetails: function (serverID, sectionID, itemID) {
				this.navigate('!/servers/' + serverID + '/sections/' + sectionID + '/details/' + itemID, {trigger: true});
			},

			onNavigateShow: function () {
				var serverID = appModel.get('server').id;
				var sectionID = appModel.get('section').id;
				var itemID = appModel.get('item').id;

				// Do not set trigger since ShowDetailsView is handling navigating back to the show
				this.navigate('!/servers/' + serverID + '/sections/' + sectionID + '/details/' + itemID);
			},

			onNavigateSeason: function (season) {
				var serverID = appModel.get('server').id;
				var sectionID = appModel.get('section').id;
				var itemID = appModel.get('item').id;
				var seasonID = season.get('index');

				// Do not set trigger since ShowDetailsView is handling navigating to the episode list
				this.navigate('!/servers/' + serverID + '/sections/' + sectionID + '/details/' + itemID + '/season/' + seasonID);
			},

			onNavigatePlayer: function (serverID, sectionID, itemID) {
				this.navigate('!/servers/' + serverID + '/sections/' + sectionID + '/player/' + itemID, {trigger: true});
			}
		});

		return Router;
	}
);
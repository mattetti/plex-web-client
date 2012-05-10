define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',

		// Globals
		'use!backbone'
	],

	function (dispatcher, appModel) {

		var originalSync = Backbone.sync;

		// Override the sync method and manually format the url
		Backbone.sync = function (method, model, options) {
			var user = appModel.get('user');
			var server = appModel.get('server');

			// Show the loading indicator
			dispatcher.trigger('command:ShowLoading', true);

			if (!options.url && model.url) {
				options.url = _.isFunction(model.url) ? model.url() : model.url;
			} else {
				options.url = '';
			}

			// Test for a leading slash
			if (options.url.slice(0, 1) === '/') {
				options.url = '/api' + options.url;
			} else {
				options.url = '/api/' + options.url;
			}
			
			// Append the authentication token if the user has logged in
			if (options.myPlex === true) {
				options.url += '?X-Plex-Token=' + user.get('authentication_token');
				options.headers = {
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443
				};
			} else if (typeof(server) !== 'undefined') {
				var token = server.get('accessToken') ? server.get('accessToken') : user.get('authentication_token');
				
				options.url += '?X-Plex-Token=' + token;
				options.headers = {
					'X-Plex-Proxy-Host': server.get('host'),
					'X-Plex-Proxy-Port': server.get('port')
				};
			}

			options.contentType = 'application/xml',
			options.dataType = 'text';
			options.processData = false;
			options.timeout = 20000;

			originalSync(method, model, options);
		}
	}
);
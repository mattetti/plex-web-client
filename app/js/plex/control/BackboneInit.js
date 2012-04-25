define(
	[
		'plex/model/AppModel',

		// Globals
		'use!backbone'
	],

	function (appModel) {

		var originalSync = Backbone.sync;

		// Override the sync method and manually format the url
		Backbone.sync = function (method, model, options) {
			var user = appModel.get('user');
			var server = appModel.get('server');

			if (!options.url && model.url) {
				options.url = _.isFunction(model.url) ? model.url() : model.url;
			} else {
				options.url = '';
			}

			options.url = '/api/' + options.url;

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

			originalSync(method, model, options);

			// Show the loading indicator
			appModel.set('loading', true);
		}
	}
);
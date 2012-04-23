define(
	[
		// Globals
		'use!backbone',
		'use!xml2json'
	],

	function () {
		var UserModel = Backbone.Model.extend({
			url: 'users/sign_in.xml',

			sync: function (method, model, options) {
				options.type = 'POST';
				options.data = '';

				options.headers = {
					'Authorization': 'Basic ' + btoa(model.get('username') + ':' + model.get('password')),
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443,
					'X-Plex-Provides': 'player, controller',
					'X-Plex-Product': 'Web Client',
					'X-Plex-Version': '0.0.1',
					'X-Plex-Client-Identifier': '0987654321'
				};

				Backbone.sync(method, model, options);
			},

			parse: function (response) {
				return $.xml2json(response);
			}
		});

		return UserModel;
	}
);
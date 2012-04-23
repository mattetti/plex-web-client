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
				var params = {
					type: 'POST',
					url: '/api/' + model.url,
					contentType: 'application/xml',
					dataType: 'text',
					processData: false,
					headers: {
						'Authorization': 'Basic ' + window.btoa(model.get('username') + ':' + model.get('password')),
						'X-Plex-Proxy-Host': 'my.plexapp.com',
						'X-Plex-Proxy-Port': 443,
						'X-Plex-Provides': 'player, controller',
						'X-Plex-Product': 'Web Client',
						'X-Plex-Version': '0.0.1',
						'X-Plex-Client-Identifier': '0987654321'
					}
				};

				return $.ajax(_.extend(params, options));
			},

			parse: function (response) {
				return $.xml2json(response);
			}
		});

		return UserModel;
	}
);
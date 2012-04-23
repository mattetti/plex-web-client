define(
	[
		'plex/model/UserModel',
		'plex/model/collections/ServerCollection',
		'plex/model/collections/SectionCollection',

		// Globals
		'use!backbone'
	],

	function (UserModel, ServerCollection, SectionCollection) {
		var originalSync = Backbone.sync;

		var AppModel = Backbone.Model.extend({
			defaults: {
				authenticated: false,
				loading: false,
				showHeader: false,
				view: undefined,

				user: new UserModel(),
				server: undefined,
				section: undefined,

				servers: new ServerCollection(),
				sections: new SectionCollection()
			}
		});

		var appModel = new AppModel();

		// Override the sync method and manually format the url
		Backbone.sync = function (method, model, options) {
			if (!options.url && model.url) {
				options.url = _.isFunction(model.url) ? model.url() : model.url;
			} else {
				options.url = '';
			}

			options.url = '/api/' + options.url;

			// Append the authentication token if the user has logged in
			if (options.myPlex === true) {
				options.url += '?X-Plex-Token=' + appModel.get('user').get('authentication_token');
			}

			options.contentType = 'application/xml',
			options.dataType = 'text';
			options.processData = false;

			originalSync(method, model, options);
		}

		return appModel;
	}
);
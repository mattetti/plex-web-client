define(
	[
		'use!backbone'
	],

	function (Backbone) {
		var originalSync = Backbone.sync;

		var AppModel = Backbone.Model.extend({
			defaults: {
				address: undefined,
				token: undefined,
				loading: undefined,
				view: undefined
			}
		});

		var appModel = new AppModel();

		// Override the sync method and manually format the url
		Backbone.sync = function (method, model, options) {
			if (!options.url && model.url) {
				options.url = _.isFunction(model.url) ? model.url() : model.url;
			}

			options.url = options.url + '?X_Plex_Token=' + appModel.get('token');

			originalSync(method, model, options);
		}

		return appModel;
	}
);
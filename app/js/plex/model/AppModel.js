define(
	[
		'use!backbone',
		'plex/model/ServerModel'
	],

	function (Backbone, ServerModel) {
		var originalSync = Backbone.sync;

		var AppModel = Backbone.Model.extend({
			defaults: {
				address: undefined,
				token: undefined,
				loading: undefined,
				showHeader: false,
				view: undefined,

				server: new ServerModel()
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

			originalSync(method, model, options);
		}

		return appModel;
	}
);
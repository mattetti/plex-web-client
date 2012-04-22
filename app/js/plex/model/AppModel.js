define(
	[
		'use!backbone',
		'plex/model/ServerModel',
		'plex/model/collections/SectionCollection'
	],

	function (Backbone, ServerModel, SectionCollection) {
		var originalSync = Backbone.sync;

		var AppModel = Backbone.Model.extend({
			defaults: {
				address: undefined,
				token: undefined,
				loading: undefined,
				showHeader: false,
				view: undefined,

				server: new ServerModel(),
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
			options.contentType = 'application/xml',
			options.dataType = 'text';
			options.processData = false;

			originalSync(method, model, options);
		}

		return appModel;
	}
);
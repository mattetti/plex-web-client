define(
	[
		'plex/model/UserModel',
		'plex/model/collections/QueueCollection',
		'plex/model/collections/ServerCollection',
		'plex/model/collections/SectionCollection',
		'plex/model/collections/MediaItemCollection',

		// Globals
		'use!backbone'
	],

	function (UserModel, QueueCollection, ServerCollection, SectionCollection, MediaItemCollection) {

		var AppModel = Backbone.Model.extend({
			defaults: {
				authenticated: false,
				loading: false,
				error: undefined,
				showHeader: false,
				view: undefined,

				// Models
				user: new UserModel(),
				server: undefined,
				section: undefined,
				item: undefined,
				season: undefined,

				// Collections
				queue: new QueueCollection(),
				servers: new ServerCollection(),
				sections: new SectionCollection(),
				seasons: new MediaItemCollection()
			}
		});

		return new AppModel();
	}
);
define(
	[
		'plex/model/UserModel',
		'plex/model/collections/VideoCollection',
		'plex/model/collections/ServerCollection',
		'plex/model/collections/SectionCollection',

		// Globals
		'use!backbone'
	],

	function (UserModel, VideoCollection, ServerCollection, SectionCollection) {

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

				// Collections
				queue: new VideoCollection({
					url: 'pms/playlists/queue/all',
					myPlex: true
				}),
				servers: new ServerCollection(),
				sections: new SectionCollection()
			}
		});

		return new AppModel();
	}
);
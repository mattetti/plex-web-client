define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/VideoCollection',
		'plex/model/collections/MediaDirectoryCollection',
		'plex/view/MediaView'
	],

	function (	dispatcher, 
				appModel, 
				VideoCollection, 
				MediaDirectoryCollection, 
				MediaView) {

		var sections = appModel.get('sections');
		var collection;

		function fetchList(section) {
			var type = section.get('type');

			// Set the active section on the model
			appModel.set('section', section);

			switch (type) {
				case 'movie':
					collection = new VideoCollection({
						url: 'library/sections/' + section.id + '/all'
					});

					collection.fetch({
						success: onFetchMoviesSuccess,
						error: onError
					});
					break;

				case 'show':
					collection = new MediaDirectoryCollection({
						url: 'library/sections/' + section.id + '/all'
					});

					collection.fetch({
						success: onFetchShowsSuccess,
						error: onError
					});
					break;

				case 'artist':
					collection = new MediaDirectoryCollection({
						url: 'library/sections/' + section.id + '/all'
					});

					collection.fetch({
						success: onFetchMusicSuccess,
						error: onError
					});
					break;

				default:
					break;
			}
		}

		function onFetchMoviesSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new MediaView({ type: 'movies', collection: collection }),
				item: undefined,
				season: undefined
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchShowsSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new MediaView({ type: 'shows', collection: collection }),
				item: undefined,
				season: undefined
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchMusicSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new MediaView({ type: 'music', collection: collection }),
				item: undefined,
				season: undefined
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'These items are currently unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute (sectionID) {
			var section = sections.get(sectionID);

			if (typeof(section) === 'object') {
				fetchList(section);
			} else {
				sections.fetch({
					success: function (response) {
						fetchList(response.get(sectionID));
						
						// Hide the loading indicator
						dispatcher.trigger('command:ShowLoading', false);
					},
					error: onError
				});
			}
		}

		dispatcher.on('command:GetMediaList', execute);
	}
);
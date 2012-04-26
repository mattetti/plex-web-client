define(
	[
		'plex/model/AppModel',
		'plex/model/collections/VideoCollection',
		'plex/model/collections/MediaDirectoryCollection',
		'plex/view/MediaView'
	],

	function (appModel, VideoCollection, MediaDirectoryCollection, MediaView) {

		var servers = appModel.get('servers');
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
				loading: false,
				showHeader: true,
				view: new MediaView({ collection: collection })
			});
		}

		function onFetchShowsSuccess(response) {
			appModel.set({
				loading: false,
				showHeader: true,
				view: new MediaView({ collection: collection })
			});
		}

		function onFetchMusicSuccess(response) {
			appModel.set({
				loading: false,
				showHeader: true,
				view: new MediaView({ collection: collection })
			});
		}

		function onError(xhr, status, error) {
			console.log('Service error: ' + xhr + '\n' + status + '\n' + error);
		}

		return {
			execute: function (sectionID) {
				var section = sections.get(sectionID);

				if (typeof(section) === 'object') {
					fetchList(section);
				} else {
					sections.fetch({
						success: function (response) {
							fetchList(response.get(sectionID));
						},
						error: onError
					});
				}
			}
		}
	}
);
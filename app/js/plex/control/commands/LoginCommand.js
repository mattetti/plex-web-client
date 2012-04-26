define(
	[
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (appModel, ThumbnailCollection) {

		var user = appModel.get('user');
		var servers = appModel.get('servers');

		// This only exists here as it will hold all thumbnails which will
		// then be separated onto their respective server in the model
		var thumbnails = new ThumbnailCollection();


		function onFetchUserSuccess(response) {
			servers.fetch({
				success: onFetchServersSuccess,
				error: onError
			});
		}

		function onFetchServersSuccess(response) {
			appModel.set({
				authenticated: true,
				loading: false
			});
				
			thumbnails.fetch({
				success: onFetchThumbnailsSuccess,
				error: onFetchThumbnailsError
			});
			
		}

		function onFetchThumbnailsSuccess(response) {
			var groupedThumbnails = thumbnails.groupBy(function (thumbnail) {
				return thumbnail.get('machineIdentifier');
			});

			servers.each(function (server) {
				server.set('thumbnails', new ThumbnailCollection(
					groupedThumbnails[server.get('machineIdentifier')]
				));
			});

			appModel.set({loading: false});
		}

		function onFetchThumbnailsError(xhr, status, error) {
			// For now ail silently on error here, the user will 
			// still get the server list if we decide to update
			// the UI to reflect this failure handle that here

			appModel.set({loading: false});
		}

		function onError(xhr, status, error) {
			console.log('Service error: ' + xhr + '\n' + status + '\n' + error);
		}

		return {
			execute: function (username, password) {
				user.set('username', username);
				user.set('password', password);

				user.fetch({
					success: onFetchUserSuccess,
					error: onError
				});
			}
		}
	}
);
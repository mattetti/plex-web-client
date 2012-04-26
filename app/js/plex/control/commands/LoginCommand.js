define(
	[
		'plex/control/signals/ShowLoadingSignal',
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (showLoadingSignal, appModel, ThumbnailCollection) {

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

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onFetchServersSuccess(response) {
			appModel.set({
				authenticated: true
			});
				
			thumbnails.fetch({
				success: onFetchThumbnailsSuccess,
				error: onFetchThumbnailsError
			});

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onFetchThumbnailsSuccess(response) {
			// Unfortunetely with the myPlex API we can really only fetch all thumbnails
			// so we assign the respective thumbnails to their servers here
			var groupedThumbnails = thumbnails.groupBy(function (thumbnail) {
				return thumbnail.get('machineIdentifier');
			});

			servers.each(function (server) {
				var thumbnails = groupedThumbnails[server.get('machineIdentifier')]
				server.set('thumbnails', new ThumbnailCollection(thumbnails));
			});

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onFetchThumbnailsError(xhr, status, error) {
			// For now ail silently on error here, the user will 
			// still get the server list if we decide to update
			// the UI to reflect this failure handle that here

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			showLoadingSignal.dispatch(false);

			// Show an alert
			appModel.set({ error: 'The username or password is incorrect.' });
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
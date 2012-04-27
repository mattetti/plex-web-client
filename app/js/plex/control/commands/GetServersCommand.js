define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (dispatcher, appModel, ThumbnailCollection) {
		var servers = appModel.get('servers');
		var thumbnails = new ThumbnailCollection();
		
		function onFetchServersSuccess(response) {
			thumbnails.fetch({
				success: onFetchThumbnailsSuccess,
				error: onFetchThumbnailsError
			});

			// Hide the loading indicator
			//dispatcher.trigger('command:ShowLoading', false);
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
			//dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchThumbnailsError(xhr, status, error) {
			// For now ail silently on error here, the user will 
			// still get the server list if we decide to update
			// the UI to reflect this failure handle that here

			// Hide the loading indicator
			//dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			//dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'Servers unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute() {
			servers.fetch({
				success: onFetchServersSuccess,
				error: onError
			});
		}

		dispatcher.on('command:GetServers', execute);
	}
);
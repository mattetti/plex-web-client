define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (dispatcher, appModel, ThumbnailCollection) {
		var cached = false;
		var servers = appModel.get('servers');
		var thumbnails = new ThumbnailCollection();
		
		function onFetchServersSuccess(response) {
			cached = true;

			thumbnails.fetch({
				success: onFetchThumbnailsSuccess,
				error: onFetchThumbnailsError
			});

			// Notify that servers have loaded
			dispatcher.trigger('response:GetServers', true);

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchThumbnailsSuccess(response) {
			// Unfortunetely with the myPlex API we can really only fetch all thumbnails
			// so we assign the respective thumbnails to their servers here
			var groupedThumbnails = thumbnails.groupBy(function (thumbnail) {
				return thumbnail.get('machineIdentifier');
			});

			servers.each(function (server) {
				var thumbnails = groupedThumbnails[server.get('machineIdentifier')];
				server.get('thumbnails').reset(thumbnails);
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchThumbnailsError(xhr, status, error) {
			// For now fail silently on error here, the user will 
			// still get the server list if we decide to update
			// the UI to reflect this failure handle that here

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Notify that servers have loaded
			dispatcher.trigger('response:GetServers', false);

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({error: 'The servers are currently unavailable.'});
		}


		//
		// -------------------- Execute --------------------
		//

		function execute() {
			if (cached === true) {
				// Notify that servers have loaded
				dispatcher.trigger('response:GetServers', true);
			} else {
				servers.fetch({
					success: onFetchServersSuccess,
					error: onError
				});
			}
		}

		dispatcher.on('command:GetServers', execute);
	}
);
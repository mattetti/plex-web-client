define(
	[
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (appModel, ThumbnailCollection) {

		var user = appModel.get('user');
		var servers = appModel.get('servers');

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

			// TODO: assign thumbnail collections server identifier so
			// we know which server to assign the collection on response
			servers.each(function (server) { 
				appModel.set('server', server);
				var thumbnails = new ThumbnailCollection();
				thumbnails.fetch({
					success: onFetchThumbnailsSuccess,
					error: onFetchThumbnailsError
				});
			});
			
		}

		function onFetchThumbnailsSuccess(response) {
			// TODO: find the respective server to assign the collection to
			servers.each(function (server) {

			});

			// TODO: check to see success/error count matches with number of servers
			appModel.set({loading: false});
		}

		function onFetchThumbnailsError(xhr, status, error) {
			// For now ail silently on error here, the user will 
			// still get the server list if we decide to update
			// the UI to reflect this failure handle that here

			// TODO: check to see success/error count matches with number of servers
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
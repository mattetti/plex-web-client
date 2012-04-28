define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/ThumbnailCollection'
	],

	function (dispatcher, appModel, ThumbnailCollection) {

		var user = appModel.get('user');
		var servers = appModel.get('servers');

		// This only exists here as it will hold all thumbnails which will
		// then be separated onto their respective server in the model
		var thumbnails = new ThumbnailCollection();


		function onFetchUserSuccess(response) {
			dispatcher.on('response:GetServers', onGetServersResponse);
			dispatcher.trigger('command:GetServers');

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onGetServersResponse(response) {
			dispatcher.off('response:GetServers', onGetServersResponse);

			if (response === true) {
				appModel.set({
					authenticated: true
				});
			}
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			if (status.statusText === 'timeout') {
				appModel.set({ error: 'The myPlex server is not responding.'})
			} else {
				appModel.set({ error: 'The username or password is incorrect.' });
			}
		}


		//
		// -------------------- Execute --------------------
		//

		function execute(username, password) {			
			user.set('username', username);
			user.set('password', password);

			user.fetch({
				success: onFetchUserSuccess,
				error: onError
			});
		}

		dispatcher.on('command:Login', execute);
	}
);
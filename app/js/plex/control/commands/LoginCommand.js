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
			appModel.set({
				authenticated: true
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'The username or password is incorrect.' });
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
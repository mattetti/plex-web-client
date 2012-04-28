define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel'
	],

	function (dispatcher, appModel) {

		var user = appModel.get('user');

		function onError(xhr, status, error) {
			// Show an alert
			appModel.set({ error: 'This video could not be deleted.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute(item) {
			appModel.get('queue').remove(item);

			$.ajax({
				type: 'DELETE',
				url: '/api/pms/playlists/queue/items/' + item.id + '?X-Plex-Token=' + user.get('authentication_token'),
				data: '<queue_item></queue_item>',
				headers: {
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443
				},
				contentType: 'application/xml',
				dataType: 'text',
				processData: false,
				error: onError
			});
		}

		dispatcher.on('command:DeleteQueueItem', execute);
	}
);
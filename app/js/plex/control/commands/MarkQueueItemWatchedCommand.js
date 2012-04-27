define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel'
	],

	function (dispatcher, appModel) {

		var user = appModel.get('user');

		function onError(xhr, status, error) {
			// Show an alert
			appModel.set({ error: 'This item could not be marked as watched.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute(item) {
			$.ajax({
				type: 'POST',
				url: '/api/queue/items/' + item.id + '/watch' + '?X-Plex-Token=' + user.get('authentication_token'),
				headers: {
					'X-Plex-Proxy-Host': 'my.plexapp.com',
					'X-Plex-Proxy-Port': 443
				},
				contentType: 'application/xml',
				dataType: 'text',
				processData: false,
				success: onSuccess,
				error: onError
			});
		}

		dispatcher.on('command:MarkQueueItemWatched', execute);
	}
);
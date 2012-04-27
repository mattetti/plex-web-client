define(
	[
		'plex/model/AppModel'
	],

	function (appModel) {

		var user = appModel.get('user');

		function onError(xhr, status, error) {
			// Show an alert
			appModel.set({ error: 'This item could not be deleted.' });
		}

		return {
			execute: function (item) {
				$.ajax({
					type: 'DELETE',
					url: '/api/pms/playlists/queue/items/' + item.id + '?X-Plex-Token=' + user.get('authentication_token'),
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
		}
	}
);
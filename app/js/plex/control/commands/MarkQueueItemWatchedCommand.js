define(
	[
		'plex/model/AppModel'
	],

	function (appModel) {

		var user = appModel.get('user');

		function onSuccess(response) {
			console.log(response);
		}

		function onError(xhr, status, error) {
			console.log('Service error: ' + xhr + '\n' + status + '\n' + error);
		}

		return {
			execute: function (item) {
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
		}
	}
);
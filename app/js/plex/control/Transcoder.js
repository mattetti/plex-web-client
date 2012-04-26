define(
	[
		'plex/model/AppModel'
	],

	function (appModel) {
		return {
			image: function (path, width, height) {
				var server = appModel.get('server'),
					user = appModel.get('user'),
					src = '';

				src = 'http://' + server.get('host') + ':' + server.get('port');
				src += '/photo/:/transcode?url=' + escape('http://127.0.0.1:32400');
				src += escape(path);
				src += '&X-Plex-Token=' + (server.get('accessToken') ? server.get('accessToken') : user.get('authentication_token'));
				src += '&width=' + width + '&height=' + height;

				return src;
			}
		}
	}
);
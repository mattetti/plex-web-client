define(
	[
		'plex/model/AppModel',

		// Globals
		'jquery',
		'use!base64',
		'use!sha256'
	],

	function (appModel) {
		var imagePath = '/photo/:/transcode?url=';
		var m3u8Path = '/video/:/transcode/segmented/start.m3u8?identifier=com.plexapp.plugins.library&';
		var flvPath = '/video/:/transcode/generic.flv?format=flv&videoCodec=libx264&vpre=video-embedded-h264&videoBitrate=5000&audioCodec=libfaac&apre=audio-embedded-aac&audioBitrate=128&size=640x480&fakeContentLength=2000000000&';

		var publicKey = 'KQMIY6GATPC63AIMC4R2';
		var privateKey = decode64('k3U6GLkZOoNIoSgjDshPErvqMIFdE0xMTx8kgsrhnC0=');

		return {
			image: function (path, width, height) {
				var server = appModel.get('server');
				var user = appModel.get('user');

				var src = 'http://' + server.get('host') + ':' + server.get('port');
				src += imagePath + encodeURIComponent('http://127.0.0.1:32400');
				src += encodeURIComponent(path);
				src += '&X-Plex-Token=' + (server.get('accessToken') ? server.get('accessToken') : user.get('authentication_token'));
				src += '&width=' + width + '&height=' + height;

				return src;
			},

			file: function (path) {
				var server = appModel.get('server');
				var user = appModel.get('user');

				var url = 'http://' + server.get('host') + ':' + server.get('port') + path;
				url += '?X-Plex-Token=' + (server.get('accessToken') ? server.get('accessToken') : user.get('authentication_token'));

				return url;
			},

			video: function (path, successCallback, errorCallback) {
				var server = appModel.get('server');
				var user = appModel.get('user');
				var token = server.get('accessToken') ? server.get('accessToken') : user.get('authentication_token');

				var video = document.createElement('video');
				var supportsM3U8 = video.canPlayType('application/x-mpegURL').replace(/^no$/,'');
				var basePath;

				if (supportsM3U8) {
					basePath = m3u8Path;
				} else {
					basePath = flvPath;
				}

				var baseURL = 'http://' + server.get('host') + ':' + server.get('port') + '/video/:/transcode/segmented/';
				var transcodeURL = basePath + 'offset=0&quality=5&url=http%3A%2F%2F127.0.0.1%3A32400' + encodeURIComponent(path) + '&3g=0&httpCookies=&userAgent=';
				var time = Math.round(new Date().getTime() / 1000);

				HMAC_SHA256_init(privateKey);
				HMAC_SHA256_write(transcodeURL + '@' + time);

				var mac = HMAC_SHA256_finalize();
				var code = encode64(array_to_string(mac));

				var requestURL = transcodeURL;
				requestURL += '&X-Plex-Token=' + token;
				requestURL += '&X-Plex-Access-Key=' + publicKey;
				requestURL += '&X-Plex-Access-Code=' + encodeURIComponent(code);
				requestURL += '&X-Plex-Access-Time=' + time;

				if (supportsM3U8) {
					requestURL = '/api' + requestURL;

					$.ajax({
						type: 'GET',
						url: requestURL,
						dataType: 'text',
						processData: false,

						headers: {
							'X-Plex-Proxy-Host': server.get('host'),
							'X-Plex-Proxy-Port': server.get('port')
						},

						success: function (response) {
							console.log(response);
							var m3u8Rel = response.replace(/[\s\S]+(session.+?\.m3u8)[\s\S]+/, '$1');
							var session = m3u8Rel.split('/')[1];
							var m3u8 = baseURL + m3u8Rel;

							successCallback(true, m3u8, session);
						},

						error: function (xhr, status, error) {
							console.log(status);
							errorCallback(xhr, status, error);
						}
					});
				} else {
					var flv = 'http://' + server.get('host') + ':' + server.get('port') + requestURL;

					successCallback(false, flv);
				}
			}
		}
	}
);
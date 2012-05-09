define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/MediaItemCollection',
		'plex/model/collections/TrackCollection',
		'plex/view/SectionsView'
	],

	function (dispatcher, appModel, MediaItemCollection, TrackCollection, SectionsView) {
		
		var albums = appModel.get('albums');
		var cachedArtist;

		function onFetchAlbumsSuccess(response) {
			cachedArtist.set('children', response);

			var count = 0;
			var pending = 0;
			var unsortedTracks = [];
			var tracks = new TrackCollection();

			// Keep a collection of all the tracks on the artist model
			cachedArtist.set('tracks', tracks);

			response.each(function (album) {
				if (album.get('leafCount') > 0) {
					pending++;

					// We need to sort tracks in the order they were requested
					var sort = count;

					var children = new MediaItemCollection({
						url: album.get('key')
					});

					children.fetch({
						success: function (response) {
							pending--;

							album.set('children', response);
							unsortedTracks[sort] = response;

							// Hide the loading indicator
							dispatcher.trigger('command:ShowLoading', false);

							if (pending === 0) {
								// Now that all the tracks have been fetched, insert them in sorted order
								for (var i = 0; i < unsortedTracks.length; i++) {
									tracks.add(unsortedTracks[i].models);
								}

								// Notify that albums have loaded
								dispatcher.trigger('response:GetAlbums', true);
							}
						},
						error: onError
					});

					count++;
				}
			});

			if (pending === 0) {
				// Notify that albums have loaded
				dispatcher.trigger('response:GetAlbums', true);
			}
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Notify that there was an error
			dispatcher.trigger('response:GetAlbums', false);

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'These albums are currently unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute(artist) {
			if (cachedArtist === artist) {
				// Notify that albums have loaded
				dispatcher.trigger('response:GetAlbums', true);
			} else {
				cachedArtist = artist;

				albums.url = artist.get('key');
				albums.fetch({
					success: onFetchAlbumsSuccess,
					error: onError
				})
			}
		}

		dispatcher.on('command:GetAlbums', execute);
	}
);
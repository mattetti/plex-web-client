define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/collections/MediaItemCollection',
		'plex/model/collections/VideoCollection',
		'plex/view/SectionsView'
	],

	function (dispatcher, appModel, MediaItemCollection, VideoCollection, SectionsView) {
		
		var seasons = appModel.get('seasons');
		var cachedShow;

		function onFetchSeasonsSuccess(response) {
			cachedShow.set('children', response);

			var count = 0;
			var pending = 0;
			var unsortedEpisodes = [];
			var episodes = new VideoCollection();

			// Keep a collection of all the episodes on the show model
			cachedShow.set('episodes', episodes);

			response.each(function (season) {
				// The 'All Episodes' season doesn't have a type or index
				if (season.get('type') !== 'season') {
					season.set({
						type: 'season',
						index: 'all'
					});
				}

				if (season.get('leafCount') > 0) {
					pending++;

					// We need to sort episodes in the order they were requested
					var sort = count;

					var children = new MediaItemCollection({
						url: season.get('key')
					});

					children.fetch({
						success: function (response) {
							pending--;

							season.set('children', response);
							unsortedEpisodes[sort] = response;

							// Hide the loading indicator
							dispatcher.trigger('command:ShowLoading', false);

							if (pending === 0) {
								// Now that all the episodes have been fetched, insert them in sorted order
								for (var i = 0; i < unsortedEpisodes.length; i++) {
									episodes.add(unsortedEpisodes[i].models);
								}

								// Notify that seasons have loaded
								dispatcher.trigger('response:GetSeasons', true);
							}
						},
						error: onError
					});

					count++;
				}
			});

			if (pending === 0) {
				// Notify that seasons have loaded
				dispatcher.trigger('response:GetSeasons', true);
			}
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Notify that there was an error
			dispatcher.trigger('response:GetSeasons', false);

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'These seasons are currently unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute(show) {
			if (cachedShow === show) {
				// Notify that seasons have loaded
				dispatcher.trigger('response:GetSeasons', true);
			} else {
				cachedShow = show;

				seasons.url = show.get('key');
				seasons.fetch({
					success: onFetchSeasonsSuccess,
					error: onError
				})
			}
		}

		dispatcher.on('command:GetSeasons', execute);
	}
);
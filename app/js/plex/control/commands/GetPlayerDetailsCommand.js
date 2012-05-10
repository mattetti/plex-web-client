define(
	[
		'plex/control/Dispatcher',
		'plex/control/utils/Transcoder',
		'plex/model/AppModel',
		'plex/model/MediaItemModel',
		'plex/view/players/VideoPlayerView'
	],

	function ( dispatcher, transcoder, appModel, MediaItemModel, VideoPlayerView) {

		var sections = appModel.get('sections');
		var item;

		function fetchDetails(section, itemID) {
			// Set the active section on the model
			appModel.set('section', section);

			item = new MediaItemModel({
				url: 'library/metadata/' + itemID
			});

			item.fetch({
				success: onFetchMetadataSuccess,
				error: onError
			});
		}

		function onFetchMetadataSuccess(response) {
			transcoder.video(item.get('Media').Part.key, onTranscodeSuccess, onTranscodeError);
		}

		function onTranscodeSuccess(url, session) {
			item.set('url', url);

			appModel.set({
				showHeader: true,
				view: new VideoPlayerView({ model: item }),
				item: item,
				season: undefined
			});
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onTranscodeError(xhr, status, error) {
			// Show an alert
			appModel.set({ error: 'This media could not be transcoded.' });
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'This media is currently unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute (sectionID, itemID) {
			var section = sections.get(sectionID);

			if (typeof(section) === 'object') {
				fetchDetails(section, itemID);
			} else {
				sections.fetch({
					success: function (response) {
						fetchDetails(response.get(sectionID), itemID);
						
						// Hide the loading indicator
						dispatcher.trigger('command:ShowLoading', false);
					},
					error: onError
				});
			}
		}

		dispatcher.on('command:GetPlayerDetails', execute);
	}
);
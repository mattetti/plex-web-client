define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/MediaItemModel',
		'plex/view/DetailsView'
	],

	function ( dispatcher, appModel, MediaItemModel, DetailsView) {

		var sections = appModel.get('sections');
		var item;
		var childID;

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
			var type = item.get('type');

			switch (type) {
				case 'show':
					dispatcher.on('response:GetSeasons', onGetSeasonsResponse);
					dispatcher.trigger('command:GetSeasons', item);
					break;

				case 'artist':
					break;

				default:
					appModel.set({
						showHeader: true,
						view: new DetailsView({ model: item }),
						item: item,
						season: undefined
					});
			}
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onGetSeasonsResponse(response) {
			dispatcher.off('response:GetSeasons', onGetSeasonsResponse);

			if (response === true) {
				var seasons = appModel.get('seasons');
				var season;
				var model;

				seasons.each(function (child) {
					if (child.get('index') === childID) {
						season = child;
					}
				});

				if (typeof(season) === 'undefined') {
					model = item;
				} else {
					model = season;
				}

				appModel.set({
					showHeader: true,
					view: new DetailsView({ model: model }),
					item: item,
					season: season
				});
			}
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

		function execute (sectionID, itemID, seasonID) {
			var section = sections.get(sectionID);

			childID = seasonID;

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

		dispatcher.on('command:GetMediaDetails', execute);
	}
);
define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/model/MediaItemModel',
		'plex/model/collections/MediaDirectoryCollection',
		'plex/view/DetailsView'
	],

	function (	dispatcher, 
				appModel,
				MediaItemModel,
				MediaDirectoryCollection,
				DetailsView) {

		var sections = appModel.get('sections');
		var model;

		function fetchDetails(section, itemID) {
			// Set the active section on the model
			appModel.set('section', section);

			model = new MediaItemModel({
				url: 'library/metadata/' + itemID
			});

			model.fetch({
				success: onFetchMetadataSuccess,
				error: onError
			});
		}

		function fetchChildren() {
			var children = new MediaDirectoryCollection({
				url: model.get('key')
			});

			children.fetch({
				success: onFetchChildrenSuccess,
				error: onError
			})
		}

		function fetchAllChildren() {
			// TODO: Fetch all children for music artists
		}

		function ready() {
			appModel.set({
				showHeader: true,
				view: new DetailsView({ model: model }),
				item: model
			});
		}

		function onFetchMetadataSuccess(response) {
			var type = model.get('type');

			switch (type) {
				case 'show':
					fetchChildren();
					break;

				case 'artist':
					fetchAllChildren();
					break;

				default:
					ready();
			}
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onFetchChildrenSuccess(response) {
			model.set('children', response);

			ready();
			
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
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

		dispatcher.on('command:GetMediaDetails', execute);
	}
);
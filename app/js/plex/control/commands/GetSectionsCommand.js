define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/SectionsView'
	],

	function (dispatcher, appModel, SectionsView) {
		
		var sections = appModel.get('sections');

		function onSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new SectionsView(),
				section: undefined
			});

			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'This server is currently unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute() {
			sections.fetch({
				success: onSuccess,
				error: onError
			});
		}

		dispatcher.on('command:GetSections', execute);
	}
);
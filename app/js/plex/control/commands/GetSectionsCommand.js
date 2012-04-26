define(
	[
		'plex/control/signals/ShowLoadingSignal',
		'plex/model/AppModel',
		'plex/view/SectionsView'
	],

	function (showLoadingSignal, appModel, SectionsView) {
		
		var sections = appModel.get('sections');

		function onSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new SectionsView(),
				section: undefined
			});

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			showLoadingSignal.dispatch(false);

			// Show an alert
			appModel.set({ error: 'This server is currently unavailable.' });
		}

		return {
			execute: function () {
				sections.fetch({
					success: onSuccess,
					error: onError
				});
			}
		}
	}
);
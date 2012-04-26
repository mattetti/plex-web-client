define(
	[
		'plex/control/signals/ShowLoadingSignal',
		'plex/model/AppModel',
		'plex/view/QueueView'
	],

	function (showLoadingSignal, appModel, QueueView) {
		
		var queue = appModel.get('queue');

		function onSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new QueueView(),
				server: undefined,
				section: undefined
			});

			// Hide the loading indicator
			showLoadingSignal.dispatch(false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			showLoadingSignal.dispatch(false);

			// Show an alert
			appModel.set({ error: 'The queue is unavailable.' });
		}

		return {
			execute: function () {
				queue.fetch({
					success: onSuccess,
					error: onError
				});
			}
		}
	}
);
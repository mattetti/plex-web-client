define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/QueueView'
	],

	function (dispatcher, appModel, QueueView) {
		
		var queue = appModel.get('queue');

		function onSuccess(response) {
			appModel.set({
				showHeader: true,
				view: new QueueView(),
				server: undefined,
				section: undefined
			});

			// Hide the loading indicator
			//dispatcher.trigger('command:ShowLoading', false);
		}

		function onError(xhr, status, error) {
			// Hide the loading indicator
			//dispatcher.trigger('command:ShowLoading', false);

			// Show an alert
			appModel.set({ error: 'The queue is unavailable.' });
		}


		//
		// -------------------- Execute --------------------
		//

		function execute() {
			queue.fetch({
				success: onSuccess,
				error: onError
			});
		}

		dispatcher.on('command:GetQueue', execute);
	}
);
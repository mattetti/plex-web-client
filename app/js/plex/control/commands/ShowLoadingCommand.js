define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel'
	],

	function (dispatcher, appModel) {
		var count = 0;


		//
		// -------------------- Execute --------------------
		//

		function execute(show) {
			if (show === true) {
				if (count === 0) {
					appModel.set({ loading: true });
				}

				count++;
			} else {
				count--;

				if (count === 0) {
					appModel.set({ loading: false });
				}
			}
		}

		dispatcher.on('command:ShowLoading', execute);
	}
);
define(
	[
		'plex/model/AppModel'
	],

	function (appModel) {
		var count = 0;

		return {
			execute: function (show) {
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
		}
	}
);
define(
	[
		'plex/control/Router',

		// Globals
		'use!helpers',
		'use!dropdown'
	],

	function (Router) {
		return {
			init: function () {
				new Router();
			}
		}
	}
);
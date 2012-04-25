define(
	[
		'plex/control/Router',
		'plex/control/BackboneInit',
		'plex/control/CommandMap',

		// Globals
		'use!helpers',
		'use!date',
		'use!dropdown'
	],

	function (Router, BackboneInit, commandMap) {
		return {
			init: function () {
				new Router();

				commandMap.initialize();
			}
		}
	}
);
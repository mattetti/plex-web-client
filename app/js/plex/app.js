define(
	[
		'plex/control/Router',
		'plex/control/CommandMap',

		// Globals
		'plex/control/init/BackboneInit',
		'plex/control/init/HandlebarsInit',
		'use!date',
		'use!button',
		'use!dropdown'
	],

	function (Router, commandMap) {
		return {
			init: function () {
				new Router();

				commandMap.initialize();
			}
		}
	}
);
define(
	[
		'plex/control/Router',
		'plex/control/CommandMap',

		// Globals
		'plex/control/init/BackboneInit',
		'plex/control/init/HandlebarsInit',
		'use!date',
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
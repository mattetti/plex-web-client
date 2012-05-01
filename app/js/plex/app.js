define(
	[
		'plex/control/Router',
		'plex/control/Commands',	

		// Globals
		'plex/control/init/BackboneInit',
		'plex/control/init/HandlebarsInit',
		'use!date',
		'use!button',
		'use!dropdown',
		'use!tooltip'
	],

	function (Router, commandMap) {
		return {
			init: function () {
				new Router();
			}
		}
	}
);
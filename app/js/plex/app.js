define(
	[
		'plex/control/Router',
		'plex/control/Commands',	

		// Globals
		'plex/control/init/BackboneInit',
		'plex/control/init/HandlebarsInit',
		'plex/control/init/SoundManagerInit',
		'use!date',
		'use!button',
		'use!dropdown',
		'use!tooltip'
	],

	function (Router, Commands) {
		return {
			init: function () {
				new Router();
			}
		}
	}
);
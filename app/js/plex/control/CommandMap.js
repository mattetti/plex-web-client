define(
	[
		// Signals
		'plex/control/signals/LoginSignal',
		'plex/control/signals/GetMediaListSignal',

		// Commands
		'plex/control/commands/LoginCommand',
		'plex/control/commands/GetMediaListCommand'
	],

	function (	// Signals
				LoginSignal,
				GetMediaListSignal,

				// Commands
				LoginCommand,
				GetMediaListCommand) {

		return {

			initialize: function () {
				LoginSignal.add(LoginCommand.execute);
				GetMediaListSignal.add(GetMediaListCommand.execute);
			}
			
		};
    }
);
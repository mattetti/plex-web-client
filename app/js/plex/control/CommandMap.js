define(
	[
		// Signals
		'plex/control/signals/LoginSignal',

		// Commands
		'plex/control/commands/LoginCommand'
	],

	function (	// Signals
				LoginSignal, 

				// Commands
				LoginCommand) {
		return {
			initialize: function () {
				LoginSignal.add(LoginCommand.execute);
			}
		};
    }
);
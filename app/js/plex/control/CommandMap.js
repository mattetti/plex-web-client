define(
	[
		// Signals
		'plex/control/signals/LoginSignal',
		'plex/control/signals/GetMediaListSignal',
		'plex/control/signals/MarkQueueItemWatchedSignal',

		// Commands
		'plex/control/commands/LoginCommand',
		'plex/control/commands/GetMediaListCommand',
		'plex/control/commands/MarkQueueItemWatchedCommand'
	],

	function (	// Signals
				LoginSignal,
				GetMediaListSignal,
				MarkQueueItemWatchedSignal,

				// Commands
				LoginCommand,
				GetMediaListCommand,
				MarkQueueItemWatchedCommand) {

		return {

			initialize: function () {
				LoginSignal.add(LoginCommand.execute);
				GetMediaListSignal.add(GetMediaListCommand.execute);
				MarkQueueItemWatchedSignal.add(MarkQueueItemWatchedCommand.execute);
			}
			
		};
    }
);
define(
	[
		// Signals
		'plex/control/signals/LoginSignal',
		'plex/control/signals/ShowLoadingSignal',
		'plex/control/signals/GetMediaListSignal',
		'plex/control/signals/MarkQueueItemWatchedSignal',

		// Commands
		'plex/control/commands/LoginCommand',
		'plex/control/commands/ShowLoadingCommand',
		'plex/control/commands/GetMediaListCommand',
		'plex/control/commands/MarkQueueItemWatchedCommand'
	],

	function (	// Signals
				LoginSignal,
				ShowLoadingSignal,
				GetMediaListSignal,
				MarkQueueItemWatchedSignal,

				// Commands
				LoginCommand,
				ShowLoadingCommand,
				GetMediaListCommand,
				MarkQueueItemWatchedCommand) {

		return {

			initialize: function () {
				LoginSignal.add(LoginCommand.execute);
				ShowLoadingSignal.add(ShowLoadingCommand.execute);
				GetMediaListSignal.add(GetMediaListCommand.execute);
				MarkQueueItemWatchedSignal.add(MarkQueueItemWatchedCommand.execute);
			}
			
		};
    }
);
define(
	[
		// Signals
		'plex/control/signals/LoginSignal',
		'plex/control/signals/ShowLoadingSignal',
		'plex/control/signals/GetQueueSignal',
		'plex/control/signals/GetSectionsSignal',
		'plex/control/signals/GetMediaListSignal',
		'plex/control/signals/MarkQueueItemWatchedSignal',

		// Commands
		'plex/control/commands/LoginCommand',
		'plex/control/commands/ShowLoadingCommand',
		'plex/control/commands/GetQueueCommand',
		'plex/control/commands/GetSectionsCommand',
		'plex/control/commands/GetMediaListCommand',
		'plex/control/commands/MarkQueueItemWatchedCommand'
	],

	function (	// Signals
				LoginSignal,
				ShowLoadingSignal,
				GetQueueSignal,
				GetSectionsSignal,
				GetMediaListSignal,
				MarkQueueItemWatchedSignal,

				// Commands
				LoginCommand,
				ShowLoadingCommand,
				GetQueueCommand,
				GetSectionsCommand,
				GetMediaListCommand,
				MarkQueueItemWatchedCommand) {

		return {

			initialize: function () {
				LoginSignal.add(LoginCommand.execute);
				ShowLoadingSignal.add(ShowLoadingCommand.execute);
				ShowLoadingSignal.add(ShowLoadingCommand.execute);
				GetQueueSignal.add(GetQueueCommand.execute);
				GetSectionsSignal.add(GetSectionsCommand.execute);
				GetMediaListSignal.add(GetMediaListCommand.execute);
				MarkQueueItemWatchedSignal.add(MarkQueueItemWatchedCommand.execute);
			}
			
		};
    }
);
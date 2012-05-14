define(
	[
		'plex/control/Dispatcher',
		'plex/control/utils/Transcoder',
		'plex/model/PlayerModel',
		'plex/view/BaseView',
		'plex/view/players/core/ControlsView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!soundmanager'
	],

	function (dispatcher, transcoder, PlayerModel, BaseView, ControlsView) {

		var MusicPlayerView = BaseView.extend({
			id: 'music-player',
			className: 'animated slideDown',

			playerModel: undefined,
			controls: undefined,

			sound: undefined,
			volume: 1, // Used to persist volume from song to song

			nextTrack: undefined,

			initialize: function () {
				_.bindAll(this, 'onPlay', 'whileLoading', 'whitePlaying', 'onFinish');

				this.playerModel = new PlayerModel({ showMusicIcon: true });

				this.controls = this.registerView(new ControlsView({
					model: this.playerModel,
					hidePlaybackRate: true,
					hideFullscreen: true
				}));

				this.addBinding(this.controls, 'playPause', this.onControlsPlayPause);
				this.addBinding(this.controls, 'seek', this.onControlsSeek);
				this.addBinding(this.controls, 'change:volume', this.onControlsVolumeChange);
			},
			
			render: function () {
				this.$el.empty();

				this.$el.append(this.controls.render().el);

				return this;
			},

			play: function () {
				var file = transcoder.file(this.model.get('Media').Part.key);

				this.findNextTrack();
				this.playerModel.reset();

				this.$('.now-playing-title').html(this.model.get('title'));

				if (typeof(this.sound) !== 'undefined') {
					this.sound.destruct();
				}

				this.sound = soundManager.createSound({
					id: 'track_' + this.model.id,
					url: file,
					autoLoad: true,
					autoPlay: true,
					volume: this.volume * 100,
					onplay: this.onPlay,
					whileloading: this.whileLoading,
					whileplaying: this.whitePlaying,
					onfinish: this.onFinish
				});
			},

			findNextTrack: function () {
				var currentTrack = this.collection.get(this.model.id);
				var i  = this.collection.indexOf(currentTrack);

				if (i + 1 < this.collection.length) {
					this.nextTrack = this.collection.at(i + 1);
				} else {
					this.nextTrack = undefined;
				}
			},

			onControlsPlayPause: function () {
				var paused = this.playerModel.get('paused');

				this.sound.togglePause();

				console.log(paused);

				this.playerModel.set('paused', !paused);
			},

			onControlsSeek: function (position) {
				this.sound.setPosition(position * 1000);

				this.playerModel.set({
					currentTime: position,
					formattedTime: this.playerModel.secondsToHms(position)
				});
			},

			onControlsVolumeChange: function (volume) {
				this.sound.setVolume(volume * 100);

				this.volume = volume;
				this.playerModel.set('volume', volume);
			},

			onPlay: function () {
				this.playerModel.set({
					paused: false,
					volume: this.volume
				});
			},

			whileLoading: function () {
				this.playerModel.set({
					endBuffer: this.sound.bytesLoaded / this.sound.bytesTotal * (this.sound.durationEstimate / 1000),
					duration: this.sound.durationEstimate / 1000,
					formattedDuration: this.playerModel.secondsToHms(this.sound.durationEstimate / 1000)
				});
			},

			whitePlaying: function () {
				this.playerModel.set({
					currentTime: this.sound.position / 1000,
					formattedTime: this.playerModel.secondsToHms(this.sound.position / 1000)
				});
			},

			onFinish: function () {
				this.sound.destruct();
				this.sound = undefined;

				if (typeof(this.nextTrack) !== 'undefined') {
					this.model = this.nextTrack;

					this.play();
				} else {
					dispatcher.trigger('stop:music');
				}
			}
		});

		return MusicPlayerView;
	}
);
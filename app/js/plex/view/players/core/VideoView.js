define(
	[
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],
	
	function (BaseView) {

		//
		// -------------------- Private --------------------
		//

		var FULLSCREEN_VIDEO_CLASS = 'player-video-fullscreen';
		
		var VideoView = BaseView.extend({
			
			//
			// -------------------- Properties --------------------
			//

			events: {
				'loadedmetadata': 'onLoadedMetadata',
				'progress': 'onProgress',
				'canplaythrough': 'onCanPlayThrough',
				'play': 'onPlay',
				'pause': 'onPause',
				'waiting': 'onWaiting',
				'playing': 'onPlaying',
				'timeupdate': 'onTimeUpdate',
				'ended': 'onEnded',
				'volumechange': 'onVolumeChange',
				'ratechange': 'onPlaybackRateChange'
			},
			
			//
			// -------------------- Init --------------------
			//

			initialize: function (options) {
				this.addBinding(this.model, 'change:fullscreen', this.onFullscreenChange);
			},
			
			//
			// -------------------- Control --------------------
			//

			ready: function ($video) {
				this.setElement($video);

				if (typeof(this.el) === 'undefined') {
					throw('The video element initialized was not found.');
				} else {
					// If the video is muted, make sure the controls reflect this
					if (this.el.muted === true) {
						this.setVolume(0);
						this.el.muted = false;
					}
					
					// If there is already a duration, manually trigger onLoadedMetadata
					if (this.el.duration > 0) {
						this.onLoadedMetadata();
					}
				}
			},

			playPause: function() {
				if (this.el.paused === true) {
					// If the video has ended, restart from the beginning
					if (this.el.ended === true) {
						this.model.set('ended', false);
						this.el.currentTime = 0;
					}
					
					this.el.play();
				} else {	
					this.el.pause();
				}
			},
			
			sync: function () {
				var paused = this.model.get('paused');
				
				if (paused !== this.el.paused) {
					this.playPause();
				}
			},
			
			seek: function (time) {
				this.el.currentTime = time;
				
				if (this.el.paused === false) {
					this.model.set('buffering', true);
				}
			},
			
			setVolume: function (volume) {
				this.el.volume = volume;
			},

			setPlaybackRate: function (playbackRate) {
				this.el.playbackRate = playbackRate;
			},
			
			supportsFullscreen: function () {
				if( typeof(document.webkitCancelFullScreen) === 'function' ||
					typeof(document.mozCancelFullScreen) === 'function' ||
					typeof(document.cancelFullScreen) === 'function' ||
					typeof(document.exitFullscreen) === 'function' ) {
					return true;	
				} else {
					return false;
				}
			},

			supportsPlaybackRate: function () {
				return (typeof(this.el.playbackRate) !== 'undefined');
			},
			
			//
			// -------------------- Listeners --------------------
			//

			onLoadedMetadata: function () {
				var duration = this.el.duration;
				var formattedDuration = this.model.secondsToHms(duration);
				var time = this.el.currentTime;
				var formattedTime = this.model.secondsToHms(time);
				
				this.model.set({
					duration: duration,
					formattedDuration: formattedDuration,
					currentTime: time,
					formattedTime: formattedTime,
					volume: this.el.volume,
					playbackRate: this.el.playbackRate
				});
				
				// Calculate the buffer immediately in case the video is cached
				this.onProgress();
			},
			
			onProgress: function () {
				if (typeof(this.el.buffered) !== 'undefined') {
					var buffered = this.el.buffered;
				
					if (buffered.length > 0) {
						var startBuffer = buffered.start(0);
						var endBuffer = buffered.end(0);
					
						this.model.set({
							startBuffer: startBuffer,
							endBuffer: endBuffer
						});
					}
				}
			},
			
			onCanPlayThrough: function () {
				if (this.el.autoplay === true) {
					this.el.play();
				}
			},
			
			onPlay: function () {
				this.model.set({
					buffering: true,
					paused: false,
					ended: false
				});
			},
			
			onPause: function () {
				this.model.set({
					buffering: false,
					paused: true
				});
			},
			
			onWaiting: function () {
				console.log('waiting...');
				this.model.set('buffering', true);
			},
			
			onPlaying: function () {
				console.log('playing...');
				this.model.set('buffering', false);
			},
			
			onTimeUpdate: function () {
				var time = this.el.currentTime;
				var formattedTime = this.model.secondsToHms(time);
				
				this.model.set({
					buffering: false,
					currentTime: time,
					formattedTime: formattedTime
				});
				
				this.onProgress();
			},
			
			onEnded: function () {
				this.el.pause();
				this.model.set('ended', true);
			},
			
			onVolumeChange: function () {
				this.model.set('volume', this.el.volume);
			},
			
			onPlaybackRateChange: function () {
				this.model.set('playbackRate', this.el.playbackRate);
			},
			
			onFullscreenChange: function () {
				var fullscreen = this.model.get('fullscreen');
				
				if (fullscreen === true) {
					this.$el.addClass(FULLSCREEN_VIDEO_CLASS);
				} else {
					this.$el.removeClass(FULLSCREEN_VIDEO_CLASS);
				}
			}
		});
		
		return VideoView;
	}
);
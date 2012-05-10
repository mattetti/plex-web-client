define(
	[
		'text!templates/players/core/VideoWrapperView.tpl',
		'plex/view/BaseView',
		'plex/view/players/core/VideoView',
		'plex/view/players/core/ControlsView',

		// Globals
		'use!backbone'
	],
	
	function (template, BaseView, VideoView, ControlsView) {
		
		//
		// -------------------- Private --------------------
		//

		var OVERLAY_PLAY_BUTTON_CLASS = 'player-overlay-play-button';
		var OVERLAY_REPLAY_BUTTON_CLASS = 'player-overlay-replay-button';

		var tpl = Handlebars.compile(template);
		
		var Wrapper = BaseView.extend({
			
			//
			// -------------------- Properties --------------------
			//

			className: 'player-wrapper',

			video: null,
			controls: null,
			originalWidth: 0,
			originalHeight: 0,
			$overlayPlayButton: null,
			$overlayReplayButton: null,

			events: {
				'mousemove': 'onMouseMove',
				'click .player-overlay-play-button': 'onOverlayPlayClick',
				'click .player-overlay-replay-button': 'onOverlayReplayClick'
			},
			
			//
			// -------------------- Init --------------------
			//

			initialize: function (options) {
				_.bindAll(this, 'onFullscreenChange');

				this.video = this.registerView(new VideoView({ model: this.model }));
				
				this.controls = this.registerView(new ControlsView({
					model: this.model,
					overlay: false,
					hideFullscreen: (this.video.supportsFullscreen() === false)
				}));
				
				this.addBinding(this.model, 'change:paused', this.onPausedChange);
				this.addBinding(this.model, 'change:ended', this.onEndedChange);
				this.addBinding(this.model, 'change:buffering', this.onBufferingChange);
				
				this.$el.on('webkitfullscreenchange', this.onFullscreenChange);
				this.$el.on('mozfullscreenchange', this.onFullscreenChange);

				// Route control events to the video
				this.controls.on('playPause', this.video.playPause, this.video);
				this.controls.on('sync', this.video.sync, this.video);
				this.controls.on('seek', this.video.seek, this.video);
				this.controls.on('change:volume', this.video.setVolume, this.video);

				this.addBinding(this.controls, 'enterFullscreen', this.enterFullscreen);
				this.addBinding(this.controls, 'exitFullscreen', this.exitFullscreen);
			},
			
			//
			// -------------------- Control --------------------
			//

			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				this.$el.append(this.controls.render().el);
				
				return this;
			},

			ready: function () {
				var $video = this.$('video');

				this.video.ready($video);

				// Store the initial width and height of the video
				this.originalWidth = $video.width();
				this.originalHeight = $video.height();
				
				// Match the width of the wrapper to the width of the video
				this.$el.css('width', this.originalWidth);
				
				this.$overlayPlayButton = this.$('.' + OVERLAY_PLAY_BUTTON_CLASS);
				this.$overlayReplayButton = this.$('.' + OVERLAY_REPLAY_BUTTON_CLASS);
				
				this.$overlayReplayButton.hide();
				
				if ($video.get(0).autoplay === true) {
					this.$overlayPlayButton.hide();
				} else {
					// hide buffering
				}
				
				// Match the width and height of the overlay buttons to the video
				this.$overlayPlayButton.css({ 'width': this.originalWidth, 'height': this.originalHeight });
				this.$overlayReplayButton.css({ 'width': this.originalWidth, 'height': this.originalHeight });
			},
			
			enterFullscreen: function () {
				// A wrapper with a set width will not allow fullscreen
				this.$el.css('width', '100%');
				this.$overlayPlayButton.css({ 'width': '100%', 'height': '100%' });
				this.$overlayReplayButton.css({ 'width': '100%', 'height': '100%' });
				
				this.model.set('fullscreen', true);
				
				if (this.el.requestFullScreen) {
					this.el.requestFullScreen();
				} else if (this.el.requestFullscreen) {
					this.el.requestFullscreen();
				} else if (this.el.mozRequestFullScreen) {
					this.el.mozRequestFullScreen();
				} else if (this.el.webkitRequestFullScreen) {
					this.el.webkitRequestFullScreen();
				} else {
					// Default back if a function is not available
					this.onFullscreenChange();
				}
			},
			
			exitFullscreen: function () {
				if (typeof(document.cancelFullScreen) === 'function') {
					document.cancelFullScreen();
				} else if (typeof(document.exitFullscreen) === 'function') {
					document.exitFullscreen();
				} else if (typeof(document.mozCancelFullScreen) === 'function') {
					document.mozCancelFullScreen();
				} else if (typeof(document.webkitCancelFullScreen) === 'function') {
					document.webkitCancelFullScreen();
				}
			},
			
			//
			// -------------------- Listeners --------------------
			//

			onMouseMove: function () {
				this.controls.show();
			},
			
			onOverlayPlayClick: function (event) {
				event.preventDefault();

				this.video.playPause();
			},

			onOverlayReplayClick: function (event) {
				event.preventDefault();

				this.video.playPause();
			},
			
			onPausedChange: function () {
				if (this.model.get('paused') === false) {
					this.$overlayPlayButton.hide();
					this.$overlayReplayButton.hide();
				}
			},
			
			onEndedChange: function () {
				if (this.model.get('ended') === true) {
					this.$overlayReplayButton.show();
				}
			},
			
			onBufferingChange: function () {
				if (this.model.get('buffering') === true) {
				} else {
				}
			},
			
			onFullscreenChange: function () {
				if (document.webkitIsFullScreen === false || 
					document.mozFullScreen === false || 
					document.fullScreen === false ) {
					// Restore the wrapper to fit the original width
					this.$el.css('width', this.originalWidth);
					
					this.$overlayPlayButton.css({'width': this.originalWidth, 'height': this.originalHeight});
					this.$overlayReplayButton.css({'width': this.originalWidth, 'height': this.originalHeight});
					
					this.model.set('fullscreen', false);
				}
			}
		});
		
		return Wrapper;
	}
);
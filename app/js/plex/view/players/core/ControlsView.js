define(
	[
		'text!templates/players/core/ControlsView.tpl',
		'plex/view/BaseView',
		'plex/view/players/core/SeekBarView',
		'plex/view/players/core/SliderView',

		// Globals
		'use!backbone'
	],
	
	function (template, BaseView, SeekBarView, SliderView) {
		
		//
		// -------------------- Private --------------------
		//

		var OVERLAY_CONTROLS_CLASS = 'player-controls-overlay';
		var COLLAPSED_CONTROLS_CLASS = 'player-controls-collapsed';
		
		var PLAY_PAUSE_CLASS = 'player-play-pause-button';
		var PAUSE_CLASS = 'player-pause-button';
		
		var CURRENT_TIME_CLASS = 'player-current-time';
		var DURATION_CLASS = 'player-duration';
		
		var SLIDER_BUTTON_CLASS = 'player-slider-button';
		
		var VOLUME_CLASS = 'player-volume';
		var VOLUME_BUTTON_LOW_CLASS = 'player-volume-button-low';
		var VOLUME_BUTTON_OFF_CLASS = 'player-volume-button-off';
		
		var FULLSCREEN_BUTTON_CLASS = 'player-fullscreen-button';

		var tpl = Handlebars.compile(template);
		
		//
		// -------------------- View --------------------
		//
		
		var ControlsView = BaseView.extend({
			
			//
			// -------------------- Properties --------------------
			//

			className: 'player-controls',

			seekBar: null,
			volumeSlider: null,
			muted: false,
			mutedVolume: 0,
			overlay: false,
			hideVolume: false,
			hideFullscreen: false,
			hideControlsTimeout: null,

			events: {
				'click .player-play-pause-button': 'onPlayPauseClick',
				'click .player-fullscreen-button': 'onFullscreenButtonClick'
			},
			
			//
			// -------------------- Init --------------------
			//

			initialize: function (options) {
				this.overlay = options.overlay;
				this.hideVolume = options.hideVolume;
				this.hideFullscreen = options.hideFullscreen;
				
				_.bindAll(this, 'show', 'hide');

				// Create the seek bar
				this.seekBar = this.registerView(new SeekBarView({ model: this.model }));
				
				// Create the volume slider
				this.volumeSlider = this.registerView(new SliderView({ className: VOLUME_CLASS }));

				this.addBinding(this.model, 'change:paused', this.onPausedChange);
				this.addBinding(this.model, 'change:formattedTime', this.onCurrentTimeChange);
				this.addBinding(this.model, 'change:formattedDuration', this.onDurationChange);
				this.addBinding(this.model, 'change:volume', this.onVolumeChange);
				this.addBinding(this.model, 'change:fullscreen', this.onFullscreenChange);
				
				// Bind to custom events from the slider control
				this.addBinding(this.seekBar, 'seek', this.onSeek);
				this.addBinding(this.volumeSlider, 'click:button', this.onVolumeSliderButtonClick);
				this.addBinding(this.volumeSlider, 'change:value', this.onVolumeSliderValueChange);
			},
			
			//
			// -------------------- Control --------------------
			//

			render: function () {
				console.log('!!!' + this.model.get('paused'));
				this.$el.html(tpl(this.model.toJSON()));

				this.$el.prepend(this.seekBar.render().el);
				this.$('.' + FULLSCREEN_BUTTON_CLASS).after(this.volumeSlider.render().el);
				
				// Adjust the sliders to their current values immediately
				this.onVolumeChange();

				// Conditionally add the overlay controls class
				if (this.overlay === true) {
					this.$el.addClass(OVERLAY_CONTROLS_CLASS);
				}
				
				// Conditionally hide controls
				if (this.hideVolume === true) {
					this.$('.' + VOLUME_CLASS).hide();
				}
				
				if (this.hideFullscreen === true) {
					this.$('.' + FULLSCREEN_BUTTON_CLASS).hide();
				}
				
				return this;
			},

			show: function() {
				if (this.overlay === true || this.model.get('fullscreen') === true) {
					// Reset the timeout
					clearTimeout(this.hideControlsTimeout);
					
					// If there is no mouse movement for 3 seconds, hide the controls
					this.hideControlsTimeout = setTimeout( this.hide, 3000 );
				}
				
				this.$el.removeClass(COLLAPSED_CONTROLS_CLASS);
			},

			hide: function() {
				this.$el.addClass(COLLAPSED_CONTROLS_CLASS);
			},
			
			//
			// -------------------- Listeners --------------------
			//

			onPlayPauseClick: function (event) {
				// Prevent the click from navigating to a href value
				event.preventDefault();
				
				this.trigger('playPause');
			},
			
			onFullscreenButtonClick: function (event) {
				// Prevent the click from navigating to a href value
				event.preventDefault();
				
				var fullscreen = this.model.get('fullscreen');
				
				if (fullscreen === true) {
					if (this.overlay === false) {
						this.$el.removeClass(OVERLAY_CONTROLS_CLASS);
					}
					
					this.trigger('exitFullscreen');
				} else {
					this.$el.addClass(OVERLAY_CONTROLS_CLASS);
					
					this.trigger('enterFullscreen');
				}
			},
			
			onFullscreenChange: function () {
				if (this.overlay === false) {
					var fullscreen = this.model.get('fullscreen');
					
					if (fullscreen === true) {
						this.$el.addClass(OVERLAY_CONTROLS_CLASS);
					} else {
						// Reset the timeout
						clearTimeout(this.hideControlsTimeout);
						
						this.$el.removeClass(OVERLAY_CONTROLS_CLASS);
					}
				}
				
				// Re-render the seekbar since the controls width has changed
				this.seekBar.render();
				
				// Going fullscreen may pause the video unintentionally
				this.trigger('sync');
			},
			
			onPausedChange: function () {
				// Update the play/pause button
				var paused = this.model.get('paused');

				console.log(paused);
				
				if (paused) {
					this.$('.' + PLAY_PAUSE_CLASS).removeClass(PAUSE_CLASS);
				} else {
					this.$('.' + PLAY_PAUSE_CLASS).addClass(PAUSE_CLASS);
				}
			},
			
			onCurrentTimeChange: function () {
				// Update the current time value
				this.$('.' + CURRENT_TIME_CLASS).html(this.model.get('formattedTime'));
			},
			
			onDurationChange: function () {
				// Update the duration value
				this.$('.' + DURATION_CLASS).html(this.model.get('formattedDuration'));
			},
			
			onVolumeChange: function () {
				var $volumeButton = this.$('.' + VOLUME_CLASS + ' .' + SLIDER_BUTTON_CLASS);
				var volume = this.model.get('volume');
				
				// Update the slider
				this.volumeSlider.setValue(volume);
				
				// Update the volume button
				if (volume > .5) {
					this.muted = false;
					$volumeButton.removeClass(VOLUME_BUTTON_LOW_CLASS);
					$volumeButton.removeClass(VOLUME_BUTTON_OFF_CLASS);
				} else if (volume < .5 && volume > 0) {
					this.muted = false;
					$volumeButton.addClass(VOLUME_BUTTON_LOW_CLASS);
					$volumeButton.removeClass(VOLUME_BUTTON_OFF_CLASS);
				} else {
					this.muted = true;
					$volumeButton.addClass(VOLUME_BUTTON_OFF_CLASS);
					$volumeButton.removeClass(VOLUME_BUTTON_LOW_CLASS);
				}
			},
			
			onSeek: function (value) {
				this.trigger('seek', value);
			},
			
			onVolumeSliderButtonClick: function () {
				if (this.muted === true) {
					if (this.mutedVolume > 0) {
						this.trigger('change:volume', this.mutedVolume);
					} else {
						this.trigger('change:volume', 1);
					}
					
					this.muted = false;
					this.mutedVolume = 0;
				} else {
					this.muted = true;
					this.mutedVolume = this.model.get('volume');
					
					this.trigger('change:volume', 0);
				}
			},
			
			onVolumeSliderValueChange: function (value) {
				this.trigger('change:volume', value);
			}
		});
		
		return ControlsView;
	}
);
define(
	[
		'text!templates/players/core/SliderView.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],
	
	function (template, BaseView) {

		//
		// -------------------- Private --------------------
		//

		var ACTIVE_SLIDER_CLASS = 'player-active-slider';
		var BUTTON_CLASS = 'player-slider-button';
		var TRACK_CLASS = 'player-slider-track';
		var THUMB_CLASS = 'player-slider-thumb';
		var BAR_CLASS = 'player-slider-bar';

		var tpl = Handlebars.compile(template);
		
		//
		// -------------------- View --------------------
		//

		var SliderView = BaseView.extend({
			
			//
			// -------------------- Properties --------------------
			//

			currentValue: 0,
			dragging: false,
			
			events: {
				'click .player-slider-button': 'onButtonClick',
				'mousedown .player-slider-track': 'onSliderMouseDown',
			},
			
			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				_.bindAll(this, 'onSliderMouseMove', 'onSliderMouseUp');
			},
			
			//
			// -------------------- Control --------------------
			//

			render: function () {
				this.$el.html(tpl());
				
				return this;
			},
			
			calculateValue: function (pageX) {
				var $track = this.$('.' + TRACK_CLASS);
				var localX = pageX - $track.offset().left;
				var value = localX / $track.width();
				
				// Normalize the value
				if (value > 1) {
					value = 1;
				} else if (value < 0) {
					value = 0;
				}
				
				this.currentValue = value;
				
				// Dispatch a custom event with the updated value
				this.trigger('change:value', value);
			},
			
			setValue: function (value) {
				this.currentValue = value;
				
				var $track = this.$('.' + TRACK_CLASS);
				var $thumb = this.$('.' + THUMB_CLASS);
				var $bar = this.$('.' + BAR_CLASS);
				
				var trackWidth = $track.width();
				var thumbRadius = $thumb.width() / 2;
				var barWidth = value * trackWidth;
				
				// Constrain the bar so the thumb fits on the track
				if (barWidth < thumbRadius) {
					barWidth = thumbRadius;
				} else if (barWidth + thumbRadius > trackWidth) {
					barWidth = trackWidth - thumbRadius;
				}
				
				// Update the slider to reflect the new value
				$thumb.css('left', barWidth - thumbRadius);
				$bar.width(barWidth);
			},
			
			//
			// -------------------- Listeners --------------------
			//

			onButtonClick: function (event) {
				// Prevent the click from navigating to a href value
				event.preventDefault();
				
				this.trigger('click:button');
			},
			
			onSliderMouseDown: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();
				
				$(document).on('mousemove', this.onSliderMouseMove);
				$(document).on('mouseup', this.onSliderMouseUp);
				
				this.dragging = true;
				this.$el.addClass(ACTIVE_SLIDER_CLASS);
				
				this.calculateValue(event.pageX);
			},
			
			onSliderMouseMove: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();
				
				this.calculateValue(event.pageX);
			},
			
			onSliderMouseUp: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();
				
				$(document).off('mousemove', this.onVolumeSliderMouseMove);
				$(document).off('mouseup', this.onVolumeSliderMouseUp);
				
				this.dragging = false;
				this.$el.removeClass(ACTIVE_SLIDER_CLASS);
				
				this.calculateValue(event.pageX);
				
				this.trigger('release');
			}
		});
		
		return SliderView;
	}
);
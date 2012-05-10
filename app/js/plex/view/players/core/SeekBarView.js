define(
	[
		'text!templates/players/core/SeekBarView.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],
	
	function (template, BaseView) {

		//
		// -------------------- Private --------------------
		//

		var BUFFER_BAR_CLASS = 'player-buffer-bar';
		var PROGRESS_BAR_CLASS = 'player-progress-bar';
		var PROGRESS_THUMB_CLASS = 'player-progress-thumb';

		var tpl = Handlebars.compile(template);
		
		//
		// -------------------- View --------------------
		//
		
		var SeekBarView = BaseView.extend({
			
			//
			// -------------------- Properties --------------------
			//

			className: 'player-slider-track player-seek-bar',
			
			events: {
				'mousedown': 'onSeekBarMouseDown'
			},
			
			//
			// -------------------- Init --------------------
			//
			
			initialize: function (options) {
				_.bindAll(this, 'onSeekBarMouseMove', 'onSeekBarMouseUp');
				
				this.model.bind('change:formattedTime', this.onCurrentTimeChange, this);
				this.model.bind('change:startBuffer', this.onBufferChange, this);
				this.model.bind('change:endBuffer', this.onBufferChange, this);
			},
			
			//
			// -------------------- Control --------------------
			//
			
			render: function () {
				this.$el.html(tpl());
				
				this.onCurrentTimeChange();
				this.onBufferChange();
				
				return this;
			},
			
			seek: function (x) {
				var localX = x - this.$el.offset().left;
				var pct = localX / this.$el.width();
				var time = pct * this.model.get('duration');

				this.trigger('seek', time);
			},
			
			//
			// -------------------- Listeners --------------------
			//
			
			onSeekBarMouseDown: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();
				
				$(document).on('mousemove', this.onSeekBarMouseMove);
				$(document).on('mouseup', this.onSeekBarMouseUp);
				
				this.seek(event.pageX);
			},

			onSeekBarMouseMove: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();
				
				this.seek(event.pageX);
			},
			
			onSeekBarMouseUp: function (event) {
				// Prevent the click from trying to select
				event.preventDefault();

				$(document).off('mousemove', this.onSeekBarMouseMove);
				$(document).off('mouseup', this.onSeekBarMouseUp);
					
				this.seek(event.pageX);
			},
			
			onCurrentTimeChange: function () {
				var $thumb = this.$('.' + PROGRESS_THUMB_CLASS);
				var $bar = this.$('.' + PROGRESS_BAR_CLASS);
				
				// Update the progress bar to reflect the current time
				var trackWidth = this.$el.width();
				var thumbRadius = $thumb.width() / 2;
				var pct = this.model.get('currentTime') / this.model.get('duration');
				var barWidth = pct * trackWidth;
				
				// Constrain the progess bar so the thumb fits in the seek bar
				if (barWidth < thumbRadius) {
					barWidth = thumbRadius;
				} else if (barWidth + thumbRadius > trackWidth) {
					barWidth = trackWidth - thumbRadius;
				}
				
				$thumb.css('left', barWidth - thumbRadius);
				$bar.css('width', barWidth);
			},
			
			onBufferChange: function () {
				// Update the buffer bar to reflect the buffered time range
				var $bufferBar = this.$('.' + BUFFER_BAR_CLASS);
				var seekBarWidth = this.$el.width();
				var duration = this.model.get('duration');
				var startPct = this.model.get('startBuffer') / duration;
				var endPct = this.model.get('endBuffer') / duration;
				var startPosition = startPct * seekBarWidth;
				var width = endPct * seekBarWidth - startPosition;
				
				$bufferBar.css('left', startPosition);
				$bufferBar.css('width', width);
			}
		});
		
		return SeekBarView;
	}
);
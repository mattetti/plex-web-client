<a class="player-play-pause-button {{#if paused}}player-pause-button{{/if}}" href="#"></a>

<span class="now-playing">
	<span class="now-playing-label">
		<i class="{{#if showMusicIcon}}icon-music{{else}}icon-film{{/if}} icon-white"></i> Now Playing
	</span>
	<span class="now-playing-title">{{title}}</span>
</span>

<a class="player-fullscreen-button" href="#"></a>

<div class="player-time"><span class="player-current-time">{{formattedTime}}</span> / <span class="player-duration">{{formattedDuration}}</span></div>
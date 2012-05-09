<div class="now-playing">
	{{#if nextTrack}}
		<div class="pull-right">
			<span class="next-label">Next</span>
			<span class="next-title">{{nextTrack.title}}</span>
		</div>
	{{/if}}

	<span class="now-playing-label"><i class="icon-music icon-white"></i> Now Playing</span>
	<span class="now-playing-title">{{currentTrack.title}}</span>
</div>

<audio width="100%" controls></audio>
<a href="{{item.url}}">
	<span class="list-subheader">{{item.sourceTitle}}</span>

	<h2 class="list-header">{{truncate item.title 50}}</h2>
</a>

<div class="video-detail">
	<a href="{{item.url}}"><img src="{{item.thumb}}" alt="{{item.title}}" /></a>

	<div class="video-summary">
		{{truncate item.summary 200}}
		<div class="video-controls">
			<a class="mark-watched-btn btn btn-inverse"><i class="icon-ok icon-white"></i> Mark as {{#if watched}}Unwatched{{else}}Watched{{/if}}</a>
			<a class="delete-btn btn btn-danger"><i class="icon-remove icon-white"></i> Delete</a>
		</div>
	</div>
</div>
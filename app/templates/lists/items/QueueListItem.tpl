<a href="{{item.url}}">
	<span class="list-subheader">{{item.sourceTitle}}</span>

	<h2 class="list-header">{{truncate item.title 50}}</h2>
</a>

<div class="video-detail">
	<a href="{{item.url}}"><img src="{{item.thumb}}" alt="{{item.title}}" /></a>

	<div class="video-summary">
		{{truncate item.summary 200}}
	</div>

	<div class="video-detail-left">
		{{item.originallyAvailableAt}} {{item.duration}}
	</div>

	<div class="video-detail-right">
		{{#if watched}}
			<a class="mark-unwatched-btn btn btn-inverse"><i class="icon-minus-sign icon-white"></i> Mark as Unwatched</a>
		{{else}}
			<a class="mark-watched-btn btn btn-inverse"><i class="icon-ok-sign icon-white"></i> Mark as Watched</a>
		{{/if}}
		<a class="delete-btn btn btn-danger"><i class="icon-remove icon-white"></i> Delete</a>
	</div>
</div>
<a href="{{url}}">
	<span class="list-subheader">{{sourceTitle}}</span>

	<h2 class="list-header">{{truncate title 50}}</h2>
</a>

<div class="video-detail">
	<a href="{{url}}"><img src="{{thumb}}" alt="{{title}}" /></a>

	<div class="video-summary">
		{{truncate summary 200}}
		<div class="video-controls">
			<a class="btn"><i class="icon-ok"></i> Mark as Watched</a>
			<a class="btn"><i class="icon-remove"></i> Delete</a>
		</div>
	</div>
</div>
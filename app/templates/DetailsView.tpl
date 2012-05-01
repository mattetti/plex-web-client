<div class="details">
	<h2>{{item.title}}</h2>

	<div class="details-controls">
		<img class="poster" src="{{transcodeImage item.thumb 200 300}}">

		<a class="btn btn-primary" href="#!/servers/{{serverID}}/sections/{{sectionID}}/player/{{item.ratingKey}}">
			<i class="icon-eye-open icon-white"></i> Watch
		</a>

		{{createDownloadButtons item.Media}}

		<a class="btn btn-inverse" href="#!/servers/{{serverID}}/sections/{{sectionID}}/edit/{{item.ratingKey}}">
			<i class="icon-pencil icon-white"></i> Edit Metadata
		</a>
	</div>

	<div class="tagline metadata">
		<span class="rating">{{starRating item.rating}}</span>

		{{#if item.tagline}}
			{{item.tagline}}
		{{else}}
			&nbsp;
		{{/if}}
	</div>

	<div class="metadata">
		{{#if item.originallyAvailableAt}}
			<span class="metadata-label">Release Date</span>{{formatDate item.originallyAvailableAt}}
		{{else}}
			{{#if item.year}}
				<span class="metadata-label">Year</span>{{item.year}}
			{{/if}}
		{{/if}}
		
		<span class="metadata-label">Duration</span>{{formatDuration item.duration}}

		<span class="metadata-label">Rating</span>{{item.contentRating}}
	</div>

	<div class="metadata">
		<span class="metadata-label">Genre</span>{{truncateTagList item.Genre 150}}
	</div>

	<div class="metadata">
		<span class="metadata-label">Director</span>{{truncateTagList item.Director 150}}
	</div>

	<div class="metadata">
		<span class="metadata-label">Writer</span>{{truncateTagList item.Writer 150}}
	</div>

	<div class="metadata">
		<span class="metadata-label">Actors</span>{{truncateTagList item.Role 150}}
	</div>

	<div class="summary">{{truncate item.summary 700}}</div>
</div>

<div class="fanart" style="background-image: url({{transcodeImage item.art 1280 720}});">
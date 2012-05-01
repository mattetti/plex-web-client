<div class="details">
	<h2>{{title}}</h2>

	<div class="details-controls">
		<img class="poster" src="{{transcodeImage thumb 200 300}}">
		<a class="btn btn-primary"><i class="icon-eye-open icon-white"></i> Watch</a>
		<a class="btn btn-inverse"><i class="icon-inbox icon-white"></i> Download</a>
		<a class="btn btn-inverse"><i class="icon-pencil icon-white"></i> Edit Metadata</a>
	</div>

	<div class="tagline">
		<span class="rating">{{starRating rating}}</span>
		{{tagline}}
	</div>

	<div class="metadata">
		{{#if originallyAvailableAt}}
			<span class="metadata-label">Release Date</span>{{formatDate originallyAvailableAt}}
		{{else}}
			{{#if year}}
				<span class="metadata-label">Year</span>{{formatDate year}}
			{{/if}}
		{{/if}}
		
		<span class="metadata-label">Duration</span>{{formatDuration duration}}

		<span class="metadata-label">Rating</span>{{contentRating}}
	</div>

	<div class="summary">{{truncate summary 750}}</div>
</div>

<div class="fanart" style="background-image: url({{transcodeImage art 1280 720}});">
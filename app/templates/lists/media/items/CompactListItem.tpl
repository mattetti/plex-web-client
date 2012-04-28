<a href="#!/servers/{{serverID}}/sections/{{sectionID}}/details/{{item.ratingKey}}">
	{{#if item.rating}}<span class="rating">{{starRating item.rating}}</span>{{/if}}
	{{truncate item.title 30}} <span class="list-label">{{item.year}}</span>
</a>
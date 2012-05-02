<a href="#!/servers/{{machineIdentifier}}/sections">
	<span class="list-subheader">
		{{#if owned}}
			Personal
		{{else}}
			<span class="list-label">Shared by</span> {{truncate sourceTitle 20}}
		{{/if}}
	</span>

	<h2 class="list-header">{{truncate name 30}}</h2>
</a>

<div class="list-detail"><span class="list-label">Last Seen</span> {{timeAgo updatedAt}}</a></div>
<div class="list-detail"><span class="list-label">IP Address</span> {{host}}</a></div>
<div class="list-detail"><span class="list-label">Port</span> {{port}}</a></div>
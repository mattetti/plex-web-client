<ul id="breadcrumb" class="nav">
	<li>
		<a id="home-btn" href="#!/servers">Home</a>
	</li>

	<li class="divider divider-primary"></li>

	{{#if item}}
		<li class="divider"></li>

		<li>
			<a href="#!/servers/{{server.machineIdentifier}}/sections/{{section.key}}/details/{{item.ratingKey}}">
				{{item.title}}
			</a>
		</li>
	{{/if}}
</ul>

<ul class="nav pull-right">
	<li>
		<a id="queue-btn" href="#!/queue"><i class="icon-list icon-white"></i> Queue</a>
	</li>

	<li class="divider divider-dotted">
		<div class="divider-dot"></div>
		<div class="divider-dot"></div>
		<div class="divider-dot"></div>
	</li>

	<li>
		<a id="log-out-btn" href="#!/login"><i class="icon-off icon-white"></i> Log Out</a>
	</li>
</ul>
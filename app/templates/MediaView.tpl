<div class="sidebar">
	<div class="sidebar-options">
		<div class="btn-group" data-toggle="buttons-radio">
			<a class="poster-view-btn btn btn-inverse {{eq view "poster" "selected active" ""}}">
				<i class="icon-th-large icon-white"></i>
			</a>

			<a class="expanded-view-btn btn btn-inverse {{eq view "expanded" "selected active" ""}}">
				<i class="icon-th-list icon-white"></i>
			</a>

			<a class="compact-view-btn btn btn-inverse {{eq view "compact" "selected active" ""}}">
				<i class="icon-align-justify icon-white"></i>
			</a>
		</div>

		<form id="sidebar-search">
			<input type="text" class="search-query" placeholder="Search..." value="{{search}}">
		</form>

		<ul class="sidebar-filter-list">
			<li class="filter all-filter {{eq filter "all" "selected" ""}}"><a href="#">All</a></li>

			{{#if_eq type "movies"}}
				<li class="filter added-filter {{eq ../filter "added" "selected" ""}}"><a href="#">Recently Added</a></li>
				<li class="filter released-filter {{eq ../filter "released" "selected" ""}}"><a href="#">Recently Released</a></li>
				<li class="filter rated-filter {{eq ../filter "rated" "selected" ""}}"><a href="#">Highest Rated</a></li>
				<li class="filter unwatched-filter {{eq ../filter "unwatched" "selected" ""}}"><a href="#">Unwatched</a></li>
				<li class="filter watched-filter {{eq ../filter "watched" "selected" ""}}"><a href="#">Watched</a></li>
			{{/if_eq}}

			{{#if_eq type "shows"}}
				<li class="filter added-filter {{eq ../filter "added" "selected" ""}}"><a href="#">Recently Added</a></li>
				<li class="filter rated-filter {{eq ../filter "rated" "selected" ""}}"><a href="#">Highest Rated</a></li>
			{{/if_eq}}

			{{#if_eq type "music"}}
				<li class="filter added-filter {{eq ../filter "added" "selected" ""}}"><a href="#">Recently Added</a></li>
			{{/if_eq}}
		</ul>
	</div>
</div>
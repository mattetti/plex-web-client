<div class="sidebar">
	<div class="sidebar-options">
		<div class="btn-group" data-toggle="buttons-radio">
			<a class="poster-view-btn btn btn-inverse {{eq view "poster" "selected active"}}">
				<i class="icon-th-large icon-white"></i>
			</a>

			<a class="expanded-view-btn btn btn-inverse {{eq view "expanded" "selected active"}}">
				<i class="icon-th-list icon-white"></i>
			</a>

			<a class="compact-view-btn btn btn-inverse {{eq view "compact" "selected active"}}">
				<i class="icon-align-justify icon-white"></i>
			</a>
		</div>

		<form id="sidebar-search">
			<input type="text" class="search-query" placeholder="Search..." value="{{search}}">
		</form>
	</div>
</div>
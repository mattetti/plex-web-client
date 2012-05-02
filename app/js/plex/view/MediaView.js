define(
	[
		'text!templates/MediaView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/PosterList',
		'plex/view/lists/media/ExpandedList',
		'plex/view/lists/media/CompactList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, PosterList, ExpandedList, CompactList) {

		var tpl = Handlebars.compile(template);

		var MediaView = BaseView.extend({
			tagName: 'section',
			className: 'content',

			type: '',
			view: 'poster',
			filter: 'all',
			search: '',

			events: {
				'resize': 'onResize',
				'click .poster-view-btn': 'onPosterViewClick',
				'click .expanded-view-btn': 'onExpandedViewClick',
				'click .compact-view-btn': 'onCompactViewClick',
				'submit #sidebar-search': 'onSearchSubmit',
				'blur #sidebar-search': 'onSearchSubmit',
				'click .all-filter a': 'onAllClick',
				'click .added-filter a': 'onAddedClick',
				'click .released-filter a': 'onReleasedClick',
				'click .rated-filter a': 'onRatedClick',
				'click .unwatched-filter a': 'onUnwatchedClick',
				'click .watched-filter a': 'onWatchedClick'
			},

			initialize: function (options) {
				this.type = options.type;

				this.listCollection = new Backbone.Collection(this.collection.models);

				this.list = this.registerView(new PosterList({ collection: this.listCollection }));

				_.bindAll(this, 'onResize', 'loadPosters');

				$(window).on('resize', this.onResize);
			},
			
			render: function () {
				this.$el.html(tpl({
					type: this.type,
					view: this.view,
					filter: this.filter,
					search: this.search
				}));

				this.$el.append(this.list.render().el);

				// Calculate the width of the list view
				this.onResize();

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);

				return this;
			},

			loadPosters: function () {
				this.$('img.poster').lazyload({ threshold: 100 });
			},

			resetSearch: function () {
				this.$('.search-query').val('');
				this.search = '';
			},

			destroy: function () {
				$(window).off('resize', this.onResize);

				BaseView.prototype.destroy.call(this);
			},

			onResize: function () {
				this.list.$el.width(this.$el.width() - 270);
			},
			
			onPosterViewClick: function (event) {
				if (this.view !== 'poster') {
					event.preventDefault();

					this.view = 'poster';

					this.removeView(this.list);
					this.list = this.registerView(new PosterList({ collection: this.listCollection }));

					this.render();
				}
			},
			
			onExpandedViewClick: function (event) {
				if (this.view !== 'expanded') {
					event.preventDefault();

					this.view = 'expanded';

					this.removeView(this.list);
					this.list = this.registerView(new ExpandedList({ collection: this.listCollection }));

					this.render();
				}
			},
			
			onCompactViewClick: function (event) {
				if (this.view !== 'compact') {
					event.preventDefault();

					this.view = 'compact';

					this.removeView(this.list);
					this.list = this.registerView(new CompactList({ collection: this.listCollection }));

					this.render();
				}
			},

			onSearchSubmit: function (event) {
				event.preventDefault();

				var val = this.$('.search-query').val();

				if (this.search !== val) {
					this.listCollection.reset(this.collection.search(val));

					// Delay the lazy loading of images so they will already be in the DOM
					setTimeout(this.loadPosters, 200);

					this.search = val;
				}
			},

			onAllClick: function (event) {
				event.preventDefault();

				this.filter = 'all';
				this.$('.filter').removeClass('selected');
				this.$('.all-filter').addClass('selected');

				this.listCollection.reset(this.collection.all());

				this.resetSearch();
				
				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onAddedClick: function (event) {
				event.preventDefault();

				this.filter = 'added';
				this.$('.filter').removeClass('selected');
				this.$('.added-filter').addClass('selected');

				this.listCollection.reset(this.collection.added());

				this.resetSearch();
				
				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onReleasedClick: function (event) {
				event.preventDefault();

				this.filter = 'released';
				this.$('.filter').removeClass('selected');
				this.$('.released-filter').addClass('selected');

				this.listCollection.reset(this.collection.released());

				this.resetSearch();
				
				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onRatedClick: function (event) {
				event.preventDefault();

				this.filter = 'rated';
				this.$('.filter').removeClass('selected');
				this.$('.rated-filter').addClass('selected');

				this.listCollection.reset(this.collection.rated());

				this.resetSearch();
				
				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onUnwatchedClick: function (event) {
				event.preventDefault();

				this.filter = 'unwatched';
				this.$('.filter').removeClass('selected');
				this.$('.unwatched-filter').addClass('selected');

				this.listCollection.reset(this.collection.unwatched());

				this.resetSearch();
				
				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onWatchedClick: function (event) {
				event.preventDefault();

				this.filter = 'watched';
				this.$('.filter').removeClass('selected');
				this.$('.watched-filter').addClass('selected');

				this.listCollection.reset(this.collection.watched());

				this.resetSearch();

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			}
		});

		return MediaView;
	}
);
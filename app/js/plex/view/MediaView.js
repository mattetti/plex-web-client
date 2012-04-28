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

			view: 'poster',
			collection: undefined,

			events: {
				'resize': 'onResize',
				'click .poster-view-btn': 'onPosterViewClick',
				'click .expanded-view-btn': 'onExpandedViewClick',
				'click .compact-view-btn': 'onCompactViewClick'
			},

			initialize: function (options) {
				this.collection = options.collection;

				this.list = this.registerView(new PosterList({ collection: this.collection }));

				_.bindAll(this, 'onResize', 'loadPosters');

				$(window).on('resize', this.onResize);
			},
			
			render: function () {
				this.$el.html(tpl({
					view: this.view
				}));

				this.$el.append(this.list.render().el);

				// Calculate the width of the list view
				this.onResize();

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 500);

				return this;
			},

			loadPosters: function () {
				this.$('img.poster').lazyload({ threshold: 100 });
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
					this.list = this.registerView(new PosterList({ collection: this.collection }));

					this.render();
				}
			},
			
			onExpandedViewClick: function (event) {
				if (this.view !== 'expanded') {
					event.preventDefault();

					this.view = 'expanded';

					this.removeView(this.list);
					this.list = this.registerView(new ExpandedList({ collection: this.collection }));

					this.render();
				}
			},
			
			onCompactViewClick: function (event) {
				if (this.view !== 'compact') {
					event.preventDefault();

					this.view = 'compact';

					this.removeView(this.list);
					this.list = this.registerView(new CompactList({ collection: this.collection }));

					this.render();
				}
			}
		});

		return MediaView;
	}
);
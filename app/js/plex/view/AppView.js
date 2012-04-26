define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/LoadingView',
		'plex/view/HeaderView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (dispatcher, appModel, LoadingView, HeaderView) {
		var AppView = Backbone.View.extend({
			el: '#container',
			
			model: appModel,

			loadingView: undefined,
			headerView: undefined,
			views: [],

			initialize: function () {
				this.model.on('change:loading', this.onLoadingChange, this);
				this.model.on('change:showHeader', this.onShowHeaderChange, this);
				this.model.on('change:view', this.onViewChange, this);

				dispatcher.on('destroy:view', this.onViewDestroy, this);
			},

			render: function () {
				this.$el.html();

				return this;
			},

			onLoadingChange: function (model, loading) {
				if (loading === true && typeof(this.loadingView) === 'undefined') {
					this.loadingView = new LoadingView();
					this.$el.append(this.loadingView.render().el);
				} else if (typeof(this.loadingView) !== 'undefined') {
					this.loadingView.destroy();
					this.loadingView = undefined;
				}
			},

			onShowHeaderChange: function (model, showHeader) {
				if (showHeader === true && typeof(this.headerView) === 'undefined') {
					this.headerView = new HeaderView();
					this.$el.prepend(this.headerView.render().el);
				} else if (typeof(this.headerView) !== 'undefined') {
					this.headerView.destroy();
					this.headerView = undefined;
				}
			},

			onViewChange: function (model, view) {
				// Destroy previous views
				for (var i = this.views.length - 1; i >= 0; i--) {
					this.views[i].destroy();
				}

				this.views.length = 0;
				this.views.push(view);

				this.$el.append(view.render().el);

				// Reset the scroll position to the top of the page
				window.scrollTo(0, 0);

				// Trigger scroll for lazy loaded images
				this.$el.trigger('scroll');
			},

			onViewDestroy: function (view) {
				this.views.pop().destroy();
			}
		});

    	return AppView;
	}
);
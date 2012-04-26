define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/alerts/LoadingAlert',
		'plex/view/alerts/ErrorAlert',
		'plex/view/HeaderView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!lazyload'
	],

	function (dispatcher, appModel, LoadingAlert, ErrorAlert, HeaderView) {
		var AppView = Backbone.View.extend({
			el: '#container',
			
			model: appModel,

			loadingView: undefined,
			errorView: undefined,
			headerView: undefined,

			views: [],

			initialize: function () {
				this.model.on('change:loading', this.onLoadingChange, this);
				this.model.on('change:error', this.onErrorChange, this);
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
					this.loadingView = new LoadingAlert();
					this.$el.append(this.loadingView.render().el);
				} else if (typeof(this.loadingView) !== 'undefined') {
					this.loadingView.destroy();
					this.loadingView = undefined;
				}
			},

			onErrorChange: function (model, error) {
				if (typeof(error) !== 'undefined') {
					this.errorView = new ErrorAlert({ error: error });
					this.$el.append(this.errorView.render().el);
				} else {
					this.errorView.destroy();
					this.errorView = undefined;
				}

				// Reset the error silently so it doesn't trigger this again right away
				appModel.set({ error: undefined }, { silent: true });
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

				// Trigger lazy loaded images
				this.$('img.poster').lazyload({ threshold: 500 });
			},

			onViewDestroy: function (view) {
				this.views.pop().destroy();
			}
		});

    	return AppView;
	}
);
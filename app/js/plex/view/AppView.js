define(
	[
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/alerts/LoadingAlert',
		'plex/view/alerts/ErrorAlert',
		'plex/view/HeaderView',
		'plex/view/players/MusicPlayerView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!lazyload'
	],

	function (dispatcher, appModel, LoadingAlert, ErrorAlert, HeaderView, MusicPlayerView) {
		var AppView = Backbone.View.extend({
			el: '#container',
			
			model: appModel,

			loadingView: undefined,
			errorView: undefined,
			headerView: undefined,
			musicPlayerView: undefined,

			views: [],

			initialize: function () {
				this.model.on('change:loading', this.onLoadingChange, this);
				this.model.on('change:error', this.onErrorChange, this);
				this.model.on('change:showHeader', this.onShowHeaderChange, this);

				dispatcher.on('play:music', this.onPlayMusic, this);
				dispatcher.on('stop:music', this.onStopMusic, this);

				// Listen for changing and destroying subviews
				this.model.on('change:view', this.onViewChange, this);
				dispatcher.on('destroy:view', this.onViewDestroy, this);
			},

			render: function () {
				this.$el.empty();

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

			onPlayMusic: function (artist, track) {
				this.$el.addClass('music-player-active');
				
				if (typeof(this.musicPlayerView) === 'undefined') {
					this.musicPlayerView = new MusicPlayerView({ collection: artist.get('tracks'), model: track });
					this.$el.prepend(this.musicPlayerView.render().el);
				} else {
					this.musicPlayerView.model = track;
				}

				this.musicPlayerView.play();
			},

			onStopMusic: function () {
				this.$el.removeClass('music-player-active');
				
				if (typeof(this.musicPlayerView) !== 'undefined') {
					this.musicPlayerView.destroy();
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
			},

			onViewDestroy: function (view) {
				this.views.pop().destroy();
			}
		});

    	return AppView;
	}
);
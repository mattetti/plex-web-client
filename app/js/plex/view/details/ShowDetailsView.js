define(
	[
		'text!templates/details/ShowDetailsView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/SeasonList',
		'plex/view/lists/media/EpisodeList',
		'plex/view/lists/media/items/EpisodeListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView, SeasonList, EpisodeList, EpisodeListItem) {

		var tpl = Handlebars.compile(template);

		var ShowDetailsView = BaseView.extend({
			className: 'details',

			seasonList: undefined,
			season: undefined,

			episodeList: undefined,
			episodeListItem: undefined,
			nextEpisode: undefined,

			events: {
				'click .show-btn': 'onShowClick',
				'click .next-episode-btn': 'onNextEpisodeClick'
			},

			initialize: function () {
				dispatcher.on('navigate:season', this.onNavigateSeason, this);

				this.nextEpisode = this.model.get('descendants').next();

				if (typeof(this.nextEpisode) !== 'undefined') {
					this.episodeListItem = this.registerView(new EpisodeListItem({ model: this.nextEpisode }));
				}

				this.seasonList = this.registerView(new SeasonList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				var season;

				if (typeof(this.season) !== 'undefined') {
					season = this.season.get('title');
				}

				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON(),
					nextEpisode: this.nextEpisode,
					season: season
				}));

				if (typeof(this.season) === 'undefined') {
					if (typeof(this.nextEpisode) !== 'undefined') {
						this.$('.next-header').after(this.episodeListItem.render().el);
					}

					this.$('.seasons-header').after(this.seasonList.render().el);
				} else {
					this.$el.append(this.episodeList.render().el);
				}

				return this;
			},

			onShowClick: function (event) {
				event.preventDefault();

				this.season = undefined;
				this.removeView(this.episodeList);

				this.render();

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			onNextEpisodeClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('navigate:player', appModel.get('server').id, appModel.get('section').id, this.nextEpisode.id)
			},

			onNavigateSeason: function (season) {
				this.season = season;
				this.episodeList = this.registerView(new EpisodeList({ collection: season.get('children') }));

				this.render();

				// Reset the scroll position to the top of the page
				window.scrollTo(0, 0);

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);
			},

			loadPosters: function () {
				this.$('img.poster').lazyload({ threshold: 100 });
			}
		});

		return ShowDetailsView;
	}
);
define(
	[
		'text!templates/details/ShowDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/SeasonList',
		'plex/view/lists/media/items/EpisodeListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, SeasonList, EpisodeListItem) {

		var tpl = Handlebars.compile(template);

		var ShowDetailsView = BaseView.extend({
			className: 'details',

			seasonList: undefined,
			episodeListItem: undefined,
			nextEpisode: undefined,

			initialize: function () {
				this.nextEpisode = this.model.get('descendants').next();

				if (typeof(this.nextEpisode) !== 'undefined') {
					this.episodeListItem = this.registerView(new EpisodeListItem({ model: this.nextEpisode }));
				}

				this.seasonList = this.registerView(new SeasonList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON(),
					nextEpisode: this.nextEpisode
				}));

				if (typeof(this.nextEpisode) !== 'undefined') {
					this.$('.next-header').after(this.episodeListItem.render().el);
				}

				this.$('.seasons-header').after(this.seasonList.render().el);

				return this;
			}
		});

		return ShowDetailsView;
	}
);
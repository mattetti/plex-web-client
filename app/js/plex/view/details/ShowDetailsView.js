define(
	[
		'text!templates/details/ShowDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/SeasonList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, SeasonList) {

		var tpl = Handlebars.compile(template);

		var ShowDetailsView = BaseView.extend({
			className: 'details',

			seasonList: undefined,
			episodeList: undefined,
			nextEpisode: undefined,

			initialize: function () {
				this.nextEpisode = this.model.get('descendants').next();

				this.seasonList = this.registerView(new SeasonList({ collection: this.model.get('children') }));

				if (typeof(this.nextEpisode) !== 'undefined') {
					this.episodeList = this.registerView(new SeasonList({ collection: this.model.get('descendants') }));
				}
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON(),
					nextEpisode: this.nextEpisode
				}));

				this.$('.seasons-header').after(this.seasonList.render().el);

				if (typeof(this.nextEpisode) !== 'undefined') {
					this.$('.next-header').after(this.episodeList.render().el);
				}

				return this;
			}
		});

		return ShowDetailsView;
	}
);
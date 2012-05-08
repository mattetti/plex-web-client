define(
	[
		'text!templates/details/SeasonDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/EpisodeList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, EpisodeList) {

		var tpl = Handlebars.compile(template);

		var SeasonDetailsView = BaseView.extend({
			className: 'details',

			episodeList: undefined,

			initialize: function () {
				this.episodeList = this.registerView(new EpisodeList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: appModel.get('item').toJSON(),
					season: this.model.toJSON()
				}));

				this.$el.append(this.episodeList.render().el);

				return this;
			}
		});

		return SeasonDetailsView;
	}
);
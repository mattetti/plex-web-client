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

			initialize: function () {
				this.seasonList = this.registerView(new SeasonList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON()
				}));

				this.$el.append(this.seasonList.render().el);

				return this;
			}
		});

		return ShowDetailsView;
	}
);
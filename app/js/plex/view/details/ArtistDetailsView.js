define(
	[
		'text!templates/details/ArtistDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/AlbumList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, AlbumList) {

		var tpl = Handlebars.compile(template);

		var ArtistDetailsView = BaseView.extend({
			className: 'details',

			albumList: undefined,

			initialize: function () {
				this.albumList = this.registerView(new AlbumList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				console.log(this.model);

				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					artist: this.model.toJSON()
				}));

				this.$('.albums-header').after(this.albumList.render().el);

				return this;
			}
		});

		return ArtistDetailsView;
	}
);
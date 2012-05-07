define(
	[
		'text!templates/lists/media/items/AlbumListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/TrackList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, TrackList) {

		var tpl = Handlebars.compile(template);

		var AlbumListItem = BaseView.extend({
			tagName: 'li',

			trackList: undefined,

			initialize: function () {
				this.trackList = this.registerView(new TrackList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				this.$el.append(this.trackList.render().el);

				return this;
			}
		});

		return AlbumListItem;
	}
);
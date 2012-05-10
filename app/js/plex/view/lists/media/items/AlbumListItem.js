define(
	[
		'text!templates/lists/media/items/AlbumListItem.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/TrackList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView, TrackList) {

		var tpl = Handlebars.compile(template);

		var AlbumListItem = BaseView.extend({
			tagName: 'li',

			trackList: undefined,

			events: {
				'click .album-link': 'onAlbumClick'
			},

			initialize: function () {
				this.trackList = this.registerView(new TrackList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				this.$el.append(this.trackList.render().el);

				return this;
			},

			onAlbumClick: function (event) {
				event.preventDefault();

				// Start playing the first track in the album
				dispatcher.trigger('play:music', appModel.get('item'), this.model.get('children').first());
			}
		});

		return AlbumListItem;
	}
);
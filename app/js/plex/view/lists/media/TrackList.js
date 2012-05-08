define(
	[
		'plex/view/BaseView',
		'plex/view/lists/media/items/TrackListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (BaseView, TrackListItem) {
		var TrackList = BaseView.extend({
			tagName: 'ul',
			className: 'track-list',

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				this.$el.empty();

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			onAdd: function (album) {
				var item = new TrackListItem({ model: album });

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);

				this.$el.append(item.render().el);
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				this.collection.each(this.onAdd, this);
			}
		});

		return TrackList;
	}
);
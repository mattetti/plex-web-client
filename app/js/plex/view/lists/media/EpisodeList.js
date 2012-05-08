define(
	[
		'plex/view/BaseView',
		'plex/view/lists/media/items/EpisodeListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (BaseView, EpisodeListItem) {
		var EpisodeList = BaseView.extend({
			tagName: 'ul',
			className: 'episode-list',

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

			onAdd: function (episode) {
				var item = new EpisodeListItem({ model: episode });

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

		return EpisodeList;
	}
);
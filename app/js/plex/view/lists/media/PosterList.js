define(
	[
		'plex/view/BaseView',
		'plex/view/lists/media/items/PosterListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (BaseView, PosterListItem) {
		var PosterList = BaseView.extend({
			tagName: 'ul',
			className: 'poster-media-list',

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				this.$el.html();

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			onAdd: function (media) {
				var item = new PosterListItem({ model: media });

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

		return PosterList;
	}
);
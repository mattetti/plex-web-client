define(
	[
		'plex/view/BaseView',
		'plex/view/lists/media/items/ExpandedListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (BaseView, ExpandedListItem) {
		var ExpandedList = BaseView.extend({
			tagName: 'ul',
			className: 'expanded-media-list',

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
				var item = new ExpandedListItem({ model: media });

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

		return ExpandedList;
	}
);
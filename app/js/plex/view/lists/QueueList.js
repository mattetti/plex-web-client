define(
	[
		'plex/view/BaseView',
		'plex/view/lists/items/QueueListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (BaseView, QueueListItem) {
		var QueueList = BaseView.extend({
			tagName: 'ul',
			className: 'content-vertical-list',

			initialize: function (options) {
				this.filtered = options.filtered;

				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				this.$el.empty();

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			onAdd: function (video) {
				var item = new QueueListItem({ model: video, filtered: this.filtered });

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);

				this.addBinding(item, 'refresh', this.onRefresh);

				this.$el.append(item.render().el);
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				this.collection.each(this.onAdd, this);
			},

			onRefresh: function () {
				this.trigger('refresh');
			}
		});

		return QueueList;
	}
);
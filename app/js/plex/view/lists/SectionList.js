define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/SectionListItem',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView, SectionListItem) {
		var SectionList = BaseView.extend({
			tagName: 'ul',
			className: 'section-list',

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

			onAdd: function (section) {
				var item = new SectionListItem({ model: section });

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

		return SectionList;
	}
);
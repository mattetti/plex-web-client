define(
	[
		'text!templates/lists/ServerDropdownList.tpl',
		'plex/view/BaseView',
		'plex/view/lists/items/ServerDropdownListItem',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView, ServerDropdownListItem) {
		var ServerList = BaseView.extend({
			id: 'servers-dropdown-list',
			tagName: 'li',
			className: 'dropdown',
			
			template: Handlebars.compile(template),

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				this.$el.html(this.template());

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			onAdd: function (server) {
				var item = new ServerDropdownListItem({ model: server });

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);

				this.$('.divider').before(item.render().el);
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				this.collection.each(this.onAdd, this);
			}
		});

		return ServerList;
	}
);
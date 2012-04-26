define(
	[
		'text!templates/lists/ServerDropdownList.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/ServerDropdownListItem',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, ServerDropdownListItem) {

		var tpl = Handlebars.compile(template);

		var ServerDropdownList = BaseView.extend({
			id: 'server-dropdown-list',
			tagName: 'li',
			className: 'dropdown',

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				var data = {},
					server = appModel.get('server');

				if (typeof(server) === 'undefined') {
					data.title = 'Select a Server';
				} else {
					data.title = server.get('name');
				}

				this.$el.html(tpl(data));

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

		return ServerDropdownList;
	}
);
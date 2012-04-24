define(
	[
		'text!templates/lists/SectionDropdownList.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/SectionDropdownListItem',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, SectionDropdownListItem) {
		var SectionDropdownList = BaseView.extend({
			id: 'section-dropdown-list',
			tagName: 'li',
			className: 'dropdown',
			
			template: Handlebars.compile(template),

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				var data = { serverID: appModel.get('server').id },
					section = appModel.get('section');

				if (typeof(section) === 'undefined') {
					data.title = 'Select a Section';
				} else {
					data.title = section.get('title');
				}

				this.$el.html(this.template(data));

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			onAdd: function (section) {
				if (section.get('machineIdentifier') === appModel.get('server').id) {
					var item = new SectionDropdownListItem({ model: section });

					// Register the view so it will be cleaned up on destroy
					this.registerView(item);

					this.$('.divider').before(item.render().el);
				}
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				this.collection.each(this.onAdd, this);
			}
		});

		return SectionDropdownList;
	}
);
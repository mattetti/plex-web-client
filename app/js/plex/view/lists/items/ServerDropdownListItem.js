define(
	[
		'text!templates/lists/items/ServerDropdownListItem.tpl',
		'plex/control/Dispatcher',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, BaseView) {
		var ServerDropdownListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));

				return this;
			}
		});

		return ServerDropdownListItem;
	}
);
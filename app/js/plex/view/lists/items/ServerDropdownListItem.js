define(
	[
		'text!templates/lists/items/ServerDropdownListItem.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {

		var tpl = Handlebars.compile(template);

		var ServerDropdownListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			}
		});

		return ServerDropdownListItem;
	}
);
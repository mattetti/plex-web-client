define(
	[
		'text!templates/lists/items/SectionDropdownListItem.tpl',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {
		var SectionDropdownListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),
			
			render: function () {
				var key = _.last(this.model.get('key').split('/'));
				
				this.$el.html(this.template({
					key: key,
					section: this.model.toJSON()
				}));

				return this;
			}
		});

		return SectionDropdownListItem;
	}
);
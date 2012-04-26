define(
	[
		'text!templates/lists/items/SectionDropdownListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var SectionDropdownListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					section: this.model.toJSON()
				}));

				return this;
			}
		});

		return SectionDropdownListItem;
	}
);
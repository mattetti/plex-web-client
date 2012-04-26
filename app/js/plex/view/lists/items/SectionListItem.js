define(
	[
		'text!templates/lists/items/SectionListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {
		var SectionListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),
			
			render: function () {
				this.$el.html(this.template({
					serverID: appModel.get('server').id,
					section: this.model.toJSON()
				}));

				return this;
			}
		});

		return SectionListItem;
	}
);
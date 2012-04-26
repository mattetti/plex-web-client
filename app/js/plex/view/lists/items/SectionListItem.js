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

		var tpl = Handlebars.compile(template);

		var SectionListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					section: this.model.toJSON()
				}));

				return this;
			}
		});

		return SectionListItem;
	}
);
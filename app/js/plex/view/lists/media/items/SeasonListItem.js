define(
	[
		'text!templates/lists/media/items/SeasonListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var SeasonListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON()
				}));

				return this;
			}
		});

		return SeasonListItem;
	}
);
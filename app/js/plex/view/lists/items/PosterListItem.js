define(
	[
		'text!templates/lists/items/PosterListItem.tpl',
		'plex/control/Transcoder',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, transcoder, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var PosterListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					item: this.model.toJSON()
				}));

				return this;
			}
		});

		return PosterListItem;
	}
);
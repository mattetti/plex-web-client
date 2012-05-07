define(
	[
		'text!templates/lists/media/items/AlbumListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var AlbumListItem = BaseView.extend({
			tagName: 'li',
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			}
		});

		return AlbumListItem;
	}
);
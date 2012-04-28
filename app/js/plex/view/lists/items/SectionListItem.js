define(
	[
		'text!templates/lists/items/SectionListItem.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ThumbnailMarqueeList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, ThumbnailMarqueeList) {

		var tpl = Handlebars.compile(template);

		var SectionListItem = BaseView.extend({
			tagName: 'li',

			thumbnailList: undefined,
			thumbnailCollection: undefined,

			initialize: function () {
				var thumbnails = appModel.get('server').get('thumbnails');

				this.thumbnailCollection = new Backbone.Collection(thumbnails.where({ section: this.model.id }));
				this.thumbnailList = new ThumbnailMarqueeList({ collection: this.thumbnailCollection });

				this.addBinding(thumbnails, 'add', this.onThumbnailsChange);
				this.addBinding(thumbnails, 'reset', this.onThumbnailsChange);
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					section: this.model.toJSON()
				}));

				this.$('a').after(this.thumbnailList.render().el);

				return this;
			},


			//
			// -------------------- Listeners --------------------
			//

			onThumbnailsChange: function () {
				var thumbnails = appModel.get('server').get('thumbnails');

				this.thumbnailCollection.reset(thumbnails.where({ section: this.model.id }));
			}
		});

		return SectionListItem;
	}
);
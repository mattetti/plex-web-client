define(
	[
		'text!templates/lists/items/ServerListItem.tpl',
		'plex/view/lists/ThumbnailMarqueeList',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, ThumbnailMarqueeList, BaseView) {
		var ServerListItem = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'li',
			
			template: Handlebars.compile(template),

			thumbnailList: undefined,
			

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.addBinding(this.model, 'change:thumbnails', this.onThumbnailsChange);
			},


			//
			// -------------------- Control --------------------
			//

			render: function () {
				this.$el.html(this.template(this.model.toJSON()));

				return this;
			},


			//
			// -------------------- Listeners --------------------
			//

			onThumbnailsChange: function (model) {
				var thumbnailList = this.thumbnailList;
				if (!thumbnailList) {
					thumbnailList = new ThumbnailMarqueeList({collection: model.get('thumbnails')});
					this.$el.append(thumbnailList.render().el);
				} else {
					thumbnailList.collection = model.get('thumbnails');
					thumbnailList.render();
				}
			}
		});

		return ServerListItem;
	}
);
define(
	[
		'text!templates/lists/items/ServerListItem.tpl',
		'plex/view/lists/ThumbnailMarqueeList',
		'plex/view/BaseView',
		'plex/model/collections/ThumbnailCollection',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, ThumbnailMarqueeList, BaseView, ThumbnailCollection) {

		var tpl = Handlebars.compile(template);

		var ServerListItem = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'li',

			thumbnailList: undefined,

			events: {
				'mouseenter'	: 'onMouseEnter',
				'mouseleave'	: 'onMouseLeave'
			},
			

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.addBinding(this.model, 'change:thumbnails', this.onThumbnailsChange);
				this.thumbnailList = new ThumbnailMarqueeList({collection: this.model.thumbnails});
			},


			//
			// -------------------- Control --------------------
			//

			render: function () {
				this.$el.html(tpl(this.model.toJSON()));
				this.$('a').after(this.thumbnailList.render().el);

				return this;
			},


			//
			// -------------------- Listeners --------------------
			//

			onThumbnailsChange: function (model) {
				this.thumbnailList.collection = model.get('thumbnails');
				this.thumbnailList.render();
			},

			onMouseEnter: function (event) {
				this.thumbnailList.start();
			},

			onMouseLeave: function (event) {
				this.thumbnailList.stop();
			}
		});

		return ServerListItem;
	}
);
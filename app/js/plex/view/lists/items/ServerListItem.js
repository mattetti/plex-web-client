define(
	[
		'text!templates/lists/items/ServerListItem.tpl',
		'plex/view/BaseView',
		'plex/view/lists/ThumbnailMarqueeList',
		'plex/model/collections/ThumbnailCollection',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView, ThumbnailMarqueeList, ThumbnailCollection) {

		var tpl = Handlebars.compile(template);

		var ServerListItem = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'li',

			thumbnailList: undefined,

			events: {
				'mouseenter': 'onMouseEnter',
				'mouseleave': 'onMouseLeave'
			},
			

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.thumbnailList = new ThumbnailMarqueeList({ collection: this.model.get('thumbnails') });
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
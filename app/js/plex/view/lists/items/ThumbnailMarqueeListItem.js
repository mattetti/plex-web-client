define(
	[
		'text!templates/lists/items/ThumbnailMarqueeListItem.tpl',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {

		var tpl = Handlebars.compile(template);

		var ThumbnailMarqueeListItem = BaseView.extend({
			tagName: 'li',

			render: function () {
				this.$el.html(tpl(this.model.toJSON()));
				this.$('img').load(_.bind(this.onImageLoad, this));

				return this;
			},

			onImageLoad: function (event) {
				this.trigger('thumbnailLoaded', this);
			}
		});

		return ThumbnailMarqueeListItem;
	}
);
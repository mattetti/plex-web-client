define(
	[
		'text!templates/lists/items/ThumbnailMarqueeListItem.tpl',
		'plex/view/BaseView',
		'signals',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView, signals) {

		var tpl = Handlebars.compile(template);

		var ThumbnailMarqueeListItem = BaseView.extend({
			tagName: 'li',

			loaded: new signals.Signal(),
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));
				this.$('img').load(_.bind(this.onImageLoad, this));

				return this;
			},

			onImageLoad: function (event) {
				this.loaded.dispatch();
				var $image = $(event.target);
				var width = $image.css('width');
				$image.css({'width': 0, 'opacity': 0})
					.animate({'width': width, 'opacity': 1}, 300);
			}
		});

		return ThumbnailMarqueeListItem;
	}
);
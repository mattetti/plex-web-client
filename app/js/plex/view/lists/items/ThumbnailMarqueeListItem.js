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

			loadedSignal: undefined,
			
			initialize: function () {
				this.loadedSignal = new signals.Signal();
			},

			render: function () {
				this.$el.html(tpl(this.model.toJSON()));
				this.$('img').load(_.bind(this.onImageLoad, this));

				return this;
			},

			onImageLoad: function (event) {
				this.loadedSignal.dispatch(event);
			}
		});

		return ThumbnailMarqueeListItem;
	}
);
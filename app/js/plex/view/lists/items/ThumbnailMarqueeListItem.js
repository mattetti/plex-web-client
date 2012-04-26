define(
	[
		'text!templates/lists/items/ThumbnailMarqueeListItem.tpl',
		'plex/view/BaseView',
		'signals',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView, signals) {
		var ThumbnailMarqueeListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),

			loadedSignal: undefined,
			
			initialize: function () {
				this.loadedSignal = new signals.Signal();
			},

			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
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
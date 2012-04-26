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

			loaded: new signals.Signal(),
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				this.$('img').load(_.bind(this.onImageLoad, this));

				return this;
			},

			onImageLoad: function (event) {
				this.loaded.dispatch();
				$(event.target).hide().fadeIn(400);
			}
		});

		return ThumbnailMarqueeListItem;
	}
);
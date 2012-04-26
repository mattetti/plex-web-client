define(
	[
		'text!templates/lists/items/PosterListItem.tpl',
		'plex/control/Transcoder',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars',
		'use!lazyload',
	],

	function (template, transcoder, BaseView) {
		var PosterListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				this.$('.poster').lazyload();

				return this;
			}
		});

		return PosterListItem;
	}
);
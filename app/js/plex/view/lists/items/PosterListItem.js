define(
	[
		'text!templates/lists/items/PosterListItem.tpl',
		'plex/control/Transcoder',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!lazyload',
	],

	function (template, transcoder, BaseView) {
		var PosterListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),

			events: {
				'click a': 'onClick'
			},
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				this.$('.poster').lazyload();

				return this;
			},

			onClick: function (event) {
				event.preventDefault();

				var Media = this.model.get('Media');

				if (typeof(Media) !== 'undefined') {
					transcoder.video(Media.Part.key);
				}
			}
		});

		return PosterListItem;
	}
);
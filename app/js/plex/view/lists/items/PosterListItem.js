define(
	[
		'text!templates/lists/items/PosterListItem.tpl',
		'plex/control/Transcoder',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, transcoder, BaseView) {

		var tpl = Handlebars.compile(template);

		var PosterListItem = BaseView.extend({
			tagName: 'li',
			
			events: {
				'click a': 'onClick'
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

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
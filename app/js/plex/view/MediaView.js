define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/PosterList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView, PosterList) {
		var MediaView = BaseView.extend({
			tagName: 'section',
			className: 'content',

			events: {
			},

			initialize: function (options) {
				this.list = this.registerView(new PosterList({ collection: options.collection }));
			},
			
			render: function () {
				this.$el.html();
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return MediaView;
	}
);
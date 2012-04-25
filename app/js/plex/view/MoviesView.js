define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView) {
		var MediaView = BaseView.extend({
			tagName: 'section',
			className: 'content animated-fast scaleIn',

			events: {
			},

			initialize: function () {
				//this.list = this.registerView(new SectionList({ collection: appModel.get('sections') }));
			},
			
			render: function () {
				this.$el.html(appModel.get('section').get('title'));
				//this.$el.append(this.list.render().el);

				return this;
			}
		});

		return MediaView;
	}
);
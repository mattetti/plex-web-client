define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/SectionList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView, SectionList) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width',

			events: {
			},

			initialize: function () {
				this.list = this.registerView(new SectionList({ collection: appModel.get('sections') }));
			},
			
			render: function () {
				this.$el.html();
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return ServersView;
	}
);
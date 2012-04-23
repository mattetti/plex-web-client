define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView, ServerList) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width',

			events: {
			},

			initialize: function () {
				this.list = this.registerView(new ServerList({ collection: appModel.get('servers') }));
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
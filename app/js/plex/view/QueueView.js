define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/QueueList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (appModel, BaseView, QueueList) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width',

			events: {
			},

			initialize: function () {
				this.list = this.registerView(new QueueList({ collection: appModel.get('queue') }));
			},
			
			render: function () {
				this.$el.html('<h1>Queue</h1>');
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return ServersView;
	}
);
define(
	[
		'text!templates/QueueView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/QueueList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, QueueList) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width',
			
			template: Handlebars.compile(template),

			initialize: function () {
				this.list = this.registerView(new QueueList({ collection: appModel.get('queue') }));
			},
			
			render: function () {
				this.$el.html(this.template());
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return ServersView;
	}
);
define(
	[
		'text!templates/QueueView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/QueueList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, QueueList) {

		var tpl = Handlebars.compile(template);

		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			initialize: function () {
				this.list = this.registerView(new QueueList({ collection: appModel.get('queue') }));
			},
			
			render: function () {
				this.$el.html(tpl());
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return ServersView;
	}
);
define(
	[
		'text!templates/ServersView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, ServerList) {
		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',
			
			template: Handlebars.compile(template),

			initialize: function () {
				this.list = this.registerView(new ServerList({ collection: appModel.get('servers') }));
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
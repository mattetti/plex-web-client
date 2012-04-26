define(
	[
		'text!templates/ServersView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, ServerList) {

		var tpl = Handlebars.compile(template);

		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			initialize: function () {
				this.list = this.registerView(new ServerList({ collection: appModel.get('servers') }));
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
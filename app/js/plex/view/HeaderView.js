define(
	[
		'text!templates/HeaderView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerDropdownList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, ServerDropdownList) {
		var HeaderView = BaseView.extend({
			tagName: 'header',
			
			template: Handlebars.compile(template),

			events: {
			},

			initialize: function () {
				this.addBinding(appModel, 'change:server', this.onChange);
				this.addBinding(appModel, 'change:section', this.onChange);

				this.serversList = this.registerView(new ServerDropdownList({ collection: appModel.get('servers') }));
			},
			
			render: function () {
				this.$el.html(this.template());
				this.$('#breadcrumb').append(this.serversList.render().el);

				return this;
			},

			onChange: function () {
				this.removeAllViews();
				this.render();
			}
		});

		return HeaderView;
	}
);
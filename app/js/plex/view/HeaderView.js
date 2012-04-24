define(
	[
		'text!templates/HeaderView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerDropdownList',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView, ServerDropdownList) {
		var HeaderView = BaseView.extend({
			tagName: 'header',
			
			template: Handlebars.compile(template),

			events: {
				'click #home-btn': 'onHomeClick',
				'click #queue-btn': 'onQueueClick',
				'click #log-out-btn': 'onLogOutClick'
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
			},

			onHomeClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('navigate:servers');
			},

			onQueueClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('navigate:queue');
			},

			onLogOutClick: function (event) {
				event.preventDefault();

				appModel.set('authenticated', false);
				dispatcher.trigger('navigate:login');
			}
		});

		return HeaderView;
	}
);
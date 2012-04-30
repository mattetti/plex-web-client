define(
	[
		'text!templates/HeaderView.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/ServerDropdownList',
		'plex/view/lists/SectionDropdownList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView, ServerDropdownList, SectionDropdownList) {

		var tpl = Handlebars.compile(template);

		var HeaderView = BaseView.extend({
			tagName: 'header',
			className: 'animated slideDown',

			initialize: function () {
				this.addBinding(appModel, 'change:server', this.onChange);
				this.addBinding(appModel, 'change:sections', this.onChange);
				this.addBinding(appModel, 'change:section', this.onChange);
				this.addBinding(appModel, 'change:item', this.onChange);

				this.serverList = this.registerView(new ServerDropdownList({ collection: appModel.get('servers') }));
				this.sectionList = this.registerView(new SectionDropdownList({ collection: appModel.get('sections') }));
			},
			
			render: function () {
				var server = appModel.get('server');
				var section = appModel.get('section');
				var item = appModel.get('item');
				var data = {};

				if (typeof(server) !== 'undefined') {
					data.server = server.toJSON();
				}

				if (typeof(section) !== 'undefined') {
					data.section = section.toJSON();
				}

				if (typeof(item) !== 'undefined') {
					data.item = item.toJSON();
				}

				this.$el.html(tpl(data));

				if (typeof(section) !== 'undefined') {
					this.$('.divider-primary').after(this.sectionList.render().el);
					this.$('.divider-primary').after('<li class="divider"></li>');
				}

				if (typeof(server) !== 'undefined') {
					this.$('.divider-primary').after(this.serverList.render().el);
				}

				return this;
			},

			onChange: function () {
				this.$el.empty();
				this.render();
			}
		});

		return HeaderView;
	}
);
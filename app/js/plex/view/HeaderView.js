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

				this.serverList = this.registerView(new ServerDropdownList({ collection: appModel.get('servers') }));
				this.sectionList = this.registerView(new SectionDropdownList({ collection: appModel.get('sections') }));
			},
			
			render: function () {
				this.$el.html(tpl());

				if (typeof(appModel.get('server')) !== 'undefined') {
					this.$('#breadcrumb').append(this.serverList.render().el);
				}

				if (typeof(appModel.get('section')) !== 'undefined') {
					this.$('#breadcrumb').append('<li class="divider"></li>');
					this.$('#breadcrumb').append(this.sectionList.render().el);
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
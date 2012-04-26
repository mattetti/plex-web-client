define(
	[
		'text!templates/SectionsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/SectionList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, SectionList) {

		var tpl = Handlebars.compile(template);

		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			initialize: function () {
				this.list = this.registerView(new SectionList({ collection: appModel.get('sections') }));
			},
			
			render: function () {
				this.$el.html(tpl(appModel.get('server').toJSON()));
				this.$el.append(this.list.render().el);

				return this;
			}
		});

		return ServersView;
	}
);
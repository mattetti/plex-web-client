define(
	[
		'text!templates/DetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var DetailsView = BaseView.extend({
			tagName: 'section',
			className: 'content',
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			}
		});

		return DetailsView;
	}
);
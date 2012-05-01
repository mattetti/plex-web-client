define(
	[
		'text!templates/details/MovieDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var MovieDetailsView = BaseView.extend({
			className: 'details',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON()
				}));

				this.$el.tooltip({
					selector: '.download-btn',
					placement: 'right'
				});

				return this;
			}
		});

		return MovieDetailsView;
	}
);
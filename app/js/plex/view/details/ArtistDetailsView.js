define(
	[
		'text!templates/details/ArtistDetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var ArtistDetailsView = BaseView.extend({
			className: 'details',
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON()
				}));

				return this;
			}
		});

		return ArtistDetailsView;
	}
);
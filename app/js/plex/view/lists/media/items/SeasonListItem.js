define(
	[
		'text!templates/lists/media/items/SeasonListItem.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var SeasonListItem = BaseView.extend({
			tagName: 'li',

			events: {
				'click a': 'onClick'
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					item: this.model.toJSON()
				}));

				return this;
			},

			onClick: function (event) {
				event.preventDefault();

				// The ShowDetailsView handles season navigation
				dispatcher.trigger('navigate:season', this.model);
			}
		});

		return SeasonListItem;
	}
);
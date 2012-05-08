define(
	[
		'text!templates/lists/media/items/TrackListItem.tpl',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var TrackListItem = BaseView.extend({
			tagName: 'li',

			events: {
				'click': 'onClick'
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			},

			onClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('play:music', this.model);
			}
		});

		return TrackListItem;
	}
);
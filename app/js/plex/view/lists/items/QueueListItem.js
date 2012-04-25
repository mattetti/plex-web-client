define(
	[
		'text!templates/lists/items/QueueListItem.tpl',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {
		var ServerListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),

			events: {
				'click mark-watched-btn': 'onMarkWatchedClick',
				'click delete-btn': 'onDeleteClick'
			},
			
			render: function () {
				this.$el.html(this.template({
					watched: (this.model.get('viewCount') > 0),
					item: this.model.toJSON()
				}));

				return this;
			},

			onMarkWatchedClick: function (event) {
				event.preventDefault();
			},

			onDeleteClick: function (event) {
				event.preventDefault();
			}
		});

		return ServerListItem;
	}
);
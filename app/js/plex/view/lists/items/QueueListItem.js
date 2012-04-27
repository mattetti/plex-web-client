define(
	[
		'text!templates/lists/items/QueueListItem.tpl',
		'plex/control/dispatcher',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, dispatcher, BaseView) {

		var tpl = Handlebars.compile(template);

		var ServerListItem = BaseView.extend({
			tagName: 'li',

			events: {
				'click .mark-watched-btn': 'onMarkWatchedClick',
				'click .mark-unwatched-btn': 'onMarkUnwatchedClick',
				'click .delete-btn': 'onDeleteClick'
			},

			initialize: function () {
				_.bindAll(this, 'onAnimationComplete');
			},
			
			render: function () {
				this.$el.html(tpl({
					watched: (this.model.get('viewCount') > 0),
					item: this.model.toJSON()
				}));

				return this;
			},

			close: function () {
				var opts = {
					'opacity': 0,
					'height': 0,
					'margin-bottom': 0,
					'padding-top': 0,
					'padding-bottom': 0
				};

				this.$el.animate(opts, 400, this.onAnimationComplete);
			},

			onMarkWatchedClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('command:MarkQueueItemWatched', this.model);
			},

			onMarkUnwatchedClick: function (event) {
				event.preventDefault();
			},

			onDeleteClick: function (event) {
				event.preventDefault();

				this.close();
			},

			onAnimationComplete: function () {
				this.destroy();
			}
		});

		return ServerListItem;
	}
);
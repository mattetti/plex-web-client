define(
	[
		'text!templates/lists/items/QueueListItem.tpl',
		'plex/control/Dispatcher',
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

			initialize: function (options) {
				this.filtered = options.filtered;

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

				if (this.filtered === true) {
					this.close();
				} else {
					// Tell the list to recalculate stats
					this.trigger('refresh');
				}
			},

			onMarkUnwatchedClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('command:MarkQueueItemUnwatched', this.model);

				if (this.filtered === true) {
					this.close();
				} else {
					// Tell the list to recalculate stats
					this.trigger('refresh');
				}
			},

			onDeleteClick: function (event) {
				event.preventDefault();

				dispatcher.trigger('command:DeleteQueueItem', this.model);

				this.close();
			},

			onAnimationComplete: function () {
				this.destroy();

				// Tell the list to recalculate stats
				this.trigger('refresh');
			}
		});

		return ServerListItem;
	}
);
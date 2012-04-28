define(
	[
		'text!templates/QueueView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/QueueList',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, QueueList) {

		var tpl = Handlebars.compile(template);

		var ServersView = BaseView.extend({
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			watchedCount: 0,
			unwatchedCount: 0,

			events: {
				'click .all-filter a': 'onAllClick',
				'click .unwatched-filter a': 'onUnwatchedClick',
				'click .watched-filter a': 'onWatchedClick'
			},

			initialize: function () {
				this.collection = appModel.get('queue');
				this.listCollection = new Backbone.Collection(this.collection.unwatched());

				this.list = this.registerView(new QueueList({ collection: this.listCollection }));

				this.unwatchedCount = this.collection.unwatched().length;
				this.watchedCount = this.collection.watched().length;
			},
			
			render: function () {
				this.$el.html(tpl({
					unwatchedCount: this.unwatchedCount,
					watchedCount: this.watchedCount
				}));

				this.$el.append(this.list.render().el);

				return this;
			},

			onAllClick: function (event) {
				event.preventDefault();

				this.$('.filter').removeClass('selected');
				this.$('.all-filter').addClass('selected');

				this.listCollection.reset(this.collection.models);
			},

			onUnwatchedClick: function (event) {
				event.preventDefault();

				this.$('.filter').removeClass('selected');
				this.$('.unwatched-filter').addClass('selected');

				this.listCollection.reset(this.collection.unwatched());
			},

			onWatchedClick: function (event) {
				event.preventDefault();

				this.$('.filter').removeClass('selected');
				this.$('.watched-filter').addClass('selected');

				this.listCollection.reset(this.collection.watched());
			}
		});

		return ServersView;
	}
);
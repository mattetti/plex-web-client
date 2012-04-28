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

			view: 'unwatched',
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

				this.list = this.registerView(new QueueList({ collection: this.listCollection, filtered: true }));

				this.addBinding(this.list, 'refresh', this.onRefresh);
			},
			
			render: function () {
				var unwatchedCount = this.collection.unwatched().length;
				var watchedCount = this.collection.watched().length;

				this.$el.html(tpl({
					view: this.view,
					unwatchedCount: unwatchedCount,
					watchedCount: watchedCount
				}));

				this.$el.append(this.list.render().el);

				return this;
			},

			onAllClick: function (event) {
				event.preventDefault();

				this.view = 'all';
				this.$('.filter').removeClass('selected');
				this.$('.all-filter').addClass('selected');

				this.list.filtered = false;
				this.listCollection.reset(this.collection.models);
			},

			onUnwatchedClick: function (event) {
				event.preventDefault();

				this.view = 'unwatched';
				this.$('.filter').removeClass('selected');
				this.$('.unwatched-filter').addClass('selected');

				this.list.filtered = true;
				this.listCollection.reset(this.collection.unwatched());
			},

			onWatchedClick: function (event) {
				event.preventDefault();

				this.view = 'watched';
				this.$('.filter').removeClass('selected');
				this.$('.watched-filter').addClass('selected');

				this.list.filtered = true;
				this.listCollection.reset(this.collection.watched());
			},

			onRefresh: function () {
				switch (this.view) {
					case 'unwatched':
						this.listCollection.reset(this.collection.unwatched());
						break;
					case 'watched':
						this.listCollection.reset(this.collection.watched());
						break;
					default:
						this.listCollection.reset(this.collection.models);
				}

				this.render();
			}
		});

		return ServersView;
	}
);
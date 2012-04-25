define(
	[
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/ThumbnailMarqueeListItem',

		// Globals
		'jquery', 
		'use!backbone'
	],

	function (appModel, BaseView, ThumbnailMarqueeListItem) {
		var SectionList = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'div',
			className: 'content-marquee-list',
			numVisibleItems: 5,
			speed: 1,

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);
			},
			
			render: function () {
				this.$el.html();

				// Keep the list populated
				this.onAddAll();

				return this;
			},

			//
			// -------------------- Control --------------------
			//

			start: function () {

			},

			stop: function () {

			},

			//
			// -------------------- Listeners --------------------
			//

			onAdd: function (thumbnail) {
				var item = new ThumbnailMarqueeListItem({ model: thumbnail });

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);

				this.$el.append(item.render().el);
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				// Only render the first five
				for (var i=1; i < this.numVisibleItems; i++) {
					_.bind(this.onAdd(this.collection.at(i)), this);
				}

				this.collection.each(this.onAdd, this);
			}
		});

		return SectionList;
	}
);
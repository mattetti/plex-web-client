define(
	[
		'text!templates/lists/ThumbnailMarqueeList.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/items/ThumbnailMarqueeListItem',
		'signals',

		// Globals
		'use!backbone',
		'use!handlebars',
	],

	function (template, appModel, BaseView, ThumbnailMarqueeListItem, signals) {

		var template = Handlebars.compile(template)

		var ThumbnailMarqueeList = BaseView.extend({

			//
			// -------------------- Declarations --------------------
			//

			tagName: 'div',
			className: 'thumbnail-marquee-list',
			numVisibleItems: 5,
			speed: 1,
			$list: undefined,
			loadedThumbnails: 0,
			loaded: new signals.Signal(),

			//
			// -------------------- Init --------------------
			//

			initialize: function () {
				this.numVisibleItems = this.options.numVisibleItems ? this.options.numVisibleItems : 5;
				this.speed = this.options.speed ? this.options.speed : 1;

				this.addBinding(this.collection, 'add', this.onAdd);
				this.addBinding(this.collection, 'reset', this.onAddAll);

				_.bindAll(this, 'onThumbnailLoaded');
			},
			
			render: function () {
				this.$el.html(template());
				this.$list = this.$el.find('ul');

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
				var item = new ThumbnailMarqueeListItem({model: thumbnail});
				item.loaded.addOnce(this.onThumbnailLoaded);

				// Register the view so it will be cleaned up on destroy
				this.registerView(item);

				this.$list.append(item.render().el);
			},

			onAddAll: function () {
				// Destroy any list items that have been registered already
				this.removeAllViews();

				if (this.collection.length > 0) {
					this.loadedThumbnails = 0;
					for(var i=0; i < this.numVisibleItems; i++) {
						if (i < this.numVisibleItems) {
							this.onAdd(this.collection.at(i));
						}
					}
				}
			},

			onThumbnailLoaded: function (event) {
				this.loadedThumbnails++;

				if (this.loadedThumbnails === this.numVisibleItems) {
					this.loaded.dispatch();
				}
			}
		});

		return ThumbnailMarqueeList;
	}
);
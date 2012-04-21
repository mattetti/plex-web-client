define(
	[
		'jquery', 
		'use!backbone',
		'use!handlebars',
		'plex/control/Dispatcher',
		'plex/model/AppModel',
		'plex/view/HeaderView',
	],

	function ($, Backbone, Handlebars, dispatcher, appModel, HeaderView) {
		var AppView = Backbone.View.extend({
			el: '#container',

			model: appModel,

			header: undefined,
			views: [],

			initialize: function () {
				this.model.on('change:loading', this.onLoadingChange, this);
				this.model.on('change:view', this.onViewChange, this);

				dispatcher.on('destroy:view', this.onViewDestroy, this);
			},

			onLoadingChange: function () {
				// TODO: Implement loading indicator
			},

			onViewChange: function () {
				var view = this.model.get('view');

				// Don't render the header until after login
				if (typeof(appModel.get('address')) !== 'undefined' && typeof(this.header) === 'undefined') {
					this.header = new HeaderView();
					this.$el.prepend(this.header.render().el);
				}

				// Destroy previous views
				for (var i = this.views.length - 1; i >= 0; i--) {
					this.views[i].destroy();
				}

				this.views.length = 0;
				this.views.push(view);

				this.$el.append(view.render().el);
			},

			onViewDestroy: function (view) {
				this.views.pop().destroy();
			}
		});

    	return AppView;
	}
);
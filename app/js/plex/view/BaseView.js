define(
	[
		// Globals
		'use!backbone'
	],

	function () {
		var BaseView = function (options) {
			this.views = [];
			this.bindings = [];

			Backbone.View.apply(this, [options]);
		};

		_.extend(BaseView.prototype, Backbone.View.prototype, {
			registerView: function (view) {
				if (view instanceof BaseView === true) {
					this.views.push(view);
				} else {
					throw 'Only views that extend BaseView can be registered.';
				}

				return view;
			},

			removeView: function (view) {
				var i = this.views.indexOf(view);

				view.destroy();

				// Clean up the views array
				if (i > -1) {
					this.views.splice(i, 1);
				}

				return view;
			},

			removeAllViews: function () {
				for (var i = this.views.length - 1; i >= 0; i--) {
					this.removeView(this.views[i]);
				}
			},

			addBinding: function (target, event, callback) {
				target.on(event, callback, this);

				this.bindings.push({
					target: target,
					event: event,
					callback: callback
				});
			},

			removeBinding: function (target, event, callback) {
				target.off(binding.event, binding.callback);

				// TODO: remove binding from bindings array
			},

			removeAllBindings: function () {
				_.each(this.bindings, function (binding) {
					binding.target.off(binding.event, binding.callback);
				});

				// Reset the bindings array
				this.bindings.length = 0;
			},

			destroy: function () {
				this.undelegateEvents();
				this.removeAllBindings();

				this.removeAllViews();
				this.remove();

				return this;
			}
		});

		BaseView.extend = Backbone.View.extend;

		return BaseView;
	}
);
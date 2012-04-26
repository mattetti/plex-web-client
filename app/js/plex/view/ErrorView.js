define(
	[
		'plex/view/BaseView',

		// Globals
		'use!backbone'
	],

	function (BaseView) {
		var ErrorView = BaseView.extend({
			className: 'alert-smoke error animated-slow scaleInOut',

			initialize: function (options) {
				var self = this;

				this.error = options.error;

				setTimeout(function () {
					self.destroy();
				}, 2400);
			},
			
			render: function () {
				this.$el.html(this.error);

				return this;
			}
		});

		return ErrorView;
	}
);
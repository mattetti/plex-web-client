define(
	[
		'text!templates/lists/items/PosterListItem.tpl',
		'plex/view/BaseView',

		// Globals
		'jquery', 
		'use!backbone',
		'use!handlebars'
	],

	function (template, BaseView) {
		var PosterListItem = BaseView.extend({
			tagName: 'li',
			
			template: Handlebars.compile(template),
			
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));

				return this;
			}
		});

		return PosterListItem;
	}
);
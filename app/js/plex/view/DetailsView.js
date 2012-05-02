define(
	[
		'text!templates/DetailsView.tpl',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/details/MovieDetailsView',
		'plex/view/details/ShowDetailsView',
		'plex/view/details/ArtistDetailsView',
		'plex/view/details/UnknownDetailsView',

		// Globals
		'use!backbone',
		'use!handlebars'
	],

	function (template, appModel, BaseView, MovieDetails, ShowDetailsView, ArtistDetailsView, UnknownDetailsView) {

		var tpl = Handlebars.compile(template);

		var DetailsView = BaseView.extend({
			tagName: 'section',
			className: 'content',

			detailsView: undefined,

			initialize: function () {
				var type = this.model.get('type');

				switch (type) {
					case 'movie':
						this.detailsView = this.registerView(new MovieDetails({ model: this.model }));
						break;

					case 'show':
						this.detailsView = this.registerView(new ShowDetailsView({ model: this.model }));
						break;

					case 'artist':
						this.detailsView = this.registerView(new ArtistDetailsView({ model: this.model }));
						break;
						
					default:
						this.$el.addClass('fatal');
						this.detailsView = this.registerView(new UnknownDetailsView({ model: this.model }));
				}
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));
				this.$el.prepend(this.detailsView.render().el);

				// Delay the lazy loading of images so they will already be in the DOM
				setTimeout(this.loadPosters, 200);

				return this;
			},

			loadPosters: function () {
				this.$('img.poster').lazyload({ threshold: 100 });
			}
		});

		return DetailsView;
	}
);
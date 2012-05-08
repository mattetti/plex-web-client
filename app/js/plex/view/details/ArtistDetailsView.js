define(
	[
		'text!templates/details/ArtistDetailsView.tpl',
		'plex/control/Dispatcher',
		'plex/control/utils/Transcoder',
		'plex/model/AppModel',
		'plex/view/BaseView',
		'plex/view/lists/media/AlbumList',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!mediaelement'
	],

	function (template, dispatcher, Transcoder, appModel, BaseView, AlbumList) {

		var tpl = Handlebars.compile(template);

		var ArtistDetailsView = BaseView.extend({
			className: 'details',

			albumList: undefined,
			player: undefined,

			initialize: function () {
				this.addBinding(dispatcher, 'play:audio', this.onPlay);

				this.albumList = this.registerView(new AlbumList({ collection: this.model.get('children') }));
			},
			
			render: function () {
				this.$el.html(tpl({
					serverID: appModel.get('server').id,
					sectionID: appModel.get('section').id,
					artist: this.model.toJSON()
				}));

				this.$('.albums-header').after(this.albumList.render().el);

				return this;
			},

			onPlay: function (model) {
				var file = Transcoder.file(model.get('Media').Part.key);

				console.log(file);

				$('#music-player').attr('src', file);

				this.player = new MediaElementPlayer('#music-player', {
					enablePluginDebug: false,
					plugins: ['flash'],
					pluginPath: 'swf/',
					flashName: 'flashmediaelement.swf',
				});

				this.player.load();
				this.player.play();
			}
		});

		return ArtistDetailsView;
	}
);
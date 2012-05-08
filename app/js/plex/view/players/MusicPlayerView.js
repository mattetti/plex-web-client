define(
	[
		'text!templates/players/MusicPlayerView.tpl',
		'plex/control/Dispatcher',
		'plex/control/utils/Transcoder',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!mediaelement'
	],

	function (template, dispatcher, Transcoder, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var MusicPlayerView = BaseView.extend({
			id: 'music-player',
			className: 'animated slideDown',

			player: undefined,

			initialize: function () {
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			},

			play: function () {
				var file = Transcoder.file(this.model.get('Media').Part.key);

				console.log(file);
				this.$('audio').attr('src', file);

				if (typeof(this.player) === 'undefined') {
					this.player = new MediaElementPlayer('#music-player audio', {
						enablePluginDebug: false,
						plugins: ['flash'],
						pluginPath: 'swf/',
						flashName: 'flashmediaelement.swf'
					});
				}

				this.player.load();
				this.player.play();
			}
		});

		return MusicPlayerView;
	}
);
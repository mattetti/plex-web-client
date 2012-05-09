define(
	[
		'text!templates/players/MusicPlayerView.tpl',
		'plex/control/utils/Transcoder',
		'plex/model/AppModel',
		'plex/view/BaseView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!mediaelement'
	],

	function (template, Transcoder, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var MusicPlayerView = BaseView.extend({
			id: 'music-player',
			className: 'animated slideDown',

			player: undefined,
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			},

			play: function () {
				var file = Transcoder.file(this.model.get('Media').Part.key);

				console.log(file);

				this.$('audio').attr('src', file);
				this.$('.now-playing-title').html(this.model.get('title'));

				if (typeof(this.player) === 'undefined') {
					this.player = new MediaElementPlayer('#music-player audio', {
						plugins: ['flash'],
						pluginPath: 'swf/',
						flashName: 'flashmediaelement.swf',
						success: function (player, element) {
							console.log('success!');
							player.addEventListener('ended', this.onEnded, false);
						}
					});
				}

				this.player.load();
				this.player.play();
			},

			onEnded: function (event) {
				console.log('ended!');
			}
		});

		return MusicPlayerView;
	}
);
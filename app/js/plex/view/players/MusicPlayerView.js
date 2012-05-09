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
			nextTrack: undefined,

			initialize: function () {
				_.bindAll(this, 'onEnded');
			},
			
			render: function () {
				this.$el.html(tpl());

				return this;
			},

			play: function () {
				var file = Transcoder.file(this.model.get('Media').Part.key);

				this.findNextTrack();

				this.$('audio').attr('src', file);
				this.$('.now-playing-title').html(this.model.get('title'));

				if (typeof(this.nextTrack) !== 'undefined') {
					this.$('.next-title').html(this.nextTrack.get('title'));
					this.$('.next-track').show();
				} else {
					this.$('.next-track').hide();
				}

				if (typeof(this.player) === 'undefined') {
					this.player = new MediaElementPlayer('#music-player audio', {
						plugins: ['flash'],
						pluginPath: 'swf/',
						flashName: 'flashmediaelement.swf',
						success: function (player, element) {
							console.log('loaded media element player!');
						}
					});

					this.player.$media.on('ended', this.onEnded);
				}

				this.player.load();
				this.player.play();

				console.log('now playing ' + file);
			},

			findNextTrack: function () {
				var currentTrack = this.collection.get(this.model.id);
				var i  = this.collection.indexOf(currentTrack);

				if (i + 1 < this.collection.length) {
					this.nextTrack = this.collection.at(i + 1);
				} else {
					this.nextTrack = undefined;
				}
			},

			onEnded: function (event) {
				if (typeof(this.nextTrack) !== 'undefined') {
					this.model = this.nextTrack;

					this.play();
				} else {
					dispatcher.trigger('stop:music');
				}
			}
		});

		return MusicPlayerView;
	}
);
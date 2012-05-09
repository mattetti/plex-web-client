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

				var currentTrack = this.collection.get(this.model.id);
				var i  = this.collection.indexOf(currentTrack);

				if (i + 1 < this.collection.length) {
					this.nextTrack = this.collection.at(i + 1);
				} else {
					this.nextTrack = undefined;
				}
			},
			
			render: function () {
				var data = {
					currentTrack: this.model.toJSON()
				};

				if (typeof(this.nextTrack) !== 'undefined') {
					data.nextTrack = this.nextTrack.toJSON();
				}

				this.$el.html(tpl(data));

				return this;
			},

			play: function () {
				var file = Transcoder.file(this.model.get('Media').Part.key);

				console.log('now playing ' + file);

				this.$('audio').attr('src', file);
				this.$('.now-playing-title').html(this.model.get('title'));

				if (typeof(this.nextTrack) !== 'undefined') {
					this.$('.next-title').html(this.nextTrack.get('title'));
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
			},

			onEnded: function (event) {
				if (typeof(this.nextTrack) !== 'undefined') {
					this.model = this.nextTrack;

					this.initialize();
					this.play();
				} else {
					dispatcher.trigger('stop:music');
				}
			}
		});

		return MusicPlayerView;
	}
);
define(
	[
		'text!templates/players/VideoPlayerView.tpl',
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

		var VideoPlayerView = BaseView.extend({
			id: 'video-player',
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			player: undefined,
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				console.log(this.model);

				// Start transcoding the video
				Transcoder.video(this.model.get('Media').Part.key, this.$('video'));

				return this;
			}
		});

		return VideoPlayerView;
	}
);
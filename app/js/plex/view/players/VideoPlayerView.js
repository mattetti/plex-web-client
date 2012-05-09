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
			className: 'content animated-fast scaleIn',

			player: undefined,
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				// Start transcoding the video
				Transcoder.video(this.model.get('key'), this.$('video'));

				return this;
			}
		});

		return VideoPlayerView;
	}
);
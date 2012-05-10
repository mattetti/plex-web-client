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

	function (template, transcoder, appModel, BaseView) {

		var tpl = Handlebars.compile(template);

		var VideoPlayerView = BaseView.extend({
			id: 'video-player',
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			player: undefined,
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				return this;
			}
		});

		return VideoPlayerView;
	}
);
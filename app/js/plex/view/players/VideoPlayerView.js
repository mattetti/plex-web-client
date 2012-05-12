define(
	[
		'text!templates/players/VideoPlayerView.tpl',
		'plex/model/PlayerModel',
		'plex/view/BaseView',
		'plex/view/players/core/VideoWrapperView',

		// Globals
		'use!backbone',
		'use!handlebars',
		'use!mediaelement'
	],

	function (template, PlayerModel, BaseView, VideoWrapperView) {

		var tpl = Handlebars.compile(template);

		var VideoPlayerView = BaseView.extend({
			id: 'video-player',
			tagName: 'section',
			className: 'content fixed-width animated-fast scaleIn',

			playerModel: undefined,
			wrapper: undefined,
			player: undefined,

			initialize: function () {
				this.playerModel = new PlayerModel({
					streaming: this.model.get('streaming'),
					url: this.model.get('url'),
					title: this.model.get('title')
				});

				this.wrapper = this.registerView(new VideoWrapperView({ model: this.playerModel }));
			},
			
			render: function () {
				this.$el.html(tpl(this.model.toJSON()));

				this.$el.append(this.wrapper.render().el);

				return this;
			},

			ready: function () {
				this.wrapper.ready();

				this.player = new MediaElement('media-element-video', {
					plugins: ['flash'],
					pluginPath: 'swf/',
					flashName: 'flashmediaelement.swf'
				});
			}
		});

		return VideoPlayerView;
	}
);
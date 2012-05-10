// Declare global variable to let SoundManager know we are deferring init
var SM2_DEFER = true;

define(
	[
		// Globals
		'use!soundmanager'
	],

	function () {
		soundManager = new SoundManager();
		soundManager.url = 'swf/';
		soundManager.flashVersion = 9;
		soundManager.beginDelayedInit();
	}
);
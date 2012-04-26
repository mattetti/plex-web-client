// RequireJS Configuration
require.config({
	baseUrl: 'js',

	paths: {
		// Externals
		'templates': '../templates',

		// Libraries
		'jquery': 'libs/jquery-1.7.2',
		'underscore': 'libs/underscore-1.3.3',
		'backbone': 'libs/backbone-0.9.2',
		'handlebars': 'libs/handlebars-1.0.0.beta.6',
		'signals': 'libs/signals-0.7.4',
		'xml2json': 'libs/jquery.xml2json',
		'lazyload': 'libs/jquery.lazyload',
		'date': 'libs/date',
		'base64': 'libs/base64',
		'sha256': 'libs/jssha256-0.1',
		
		// Require
		'use': 'libs/require/use-0.2.0',
		'text': 'libs/require/text-1.0.7',

		// Bootstrap
		'transition': 'libs/bootstrap/bootstrap-transition',
		'modal': 'libs/bootstrap/bootstrap-modal',
		'dropdown': 'libs/bootstrap/bootstrap-dropdown',
		'button': 'libs/bootstrap/bootstrap-button',
		'collapsible': 'libs/bootstrap/bootstrap-collapse',
		'tooltip': 'libs/bootstrap/bootstrap-tooltip',
		'tabs': 'libs/bootstrap/bootstrap-tab'
	},

	use: {
		underscore: {
			attach: '_'
		},
		backbone: {
			deps: ['use!underscore', 'jquery'],
			attach: 'Backbone'
		},
		handlebars: {
			attach: 'Handlebars'
		},
		xml2json: {
			deps: ['jquery']
		},
		lazyload: {
			deps: ['jquery']
		},
		date: {},
		base64: {},
		sha256: {},

		// Bootstrap
		transition: { deps: ['jquery'] },
		modal: { deps: ['jquery'] },
		dropdown: { deps: ['jquery'] },
		button: { deps: ['jquery'] },
		collapsible: { deps: ['jquery'] },
		tooltip: { deps: ['jquery'] },
		tabs: { deps: ['jquery'] }
	}
});

require(
	[
		'plex/app'
	],

	function (app) {
		app.init();
	}
);
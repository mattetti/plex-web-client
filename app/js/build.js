({
	appDir: '../',
	baseUrl: 'js',
	dir: '../../build',
	mainConfigFile: 'main.js',
	wrap: true,
	
	paths: {
		'almond': '../../node_modules/almond/almond',
		
		// Libraries
		'jquery': 'libs/jquery-1.7.2',
		'underscore': 'libs/underscore-1.3.3',
		'backbone': 'libs/backbone-0.9.2',
		'handlebars': 'libs/handlebars-1.0.0.beta.6',
		'xml2json': 'libs/jquery.xml2json',
		'lazyload': 'libs/jquery.lazyload',
		'date': 'libs/date',
		'base64': 'libs/base64',
		'sha256': 'libs/jssha256-0.1',
		
		// Externals
		'templates': '../templates',
		
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

	modules: [{
		name: 'main',
		include: ['almond'],
		out: 'main.js'
	}]
})
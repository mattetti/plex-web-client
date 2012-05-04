var port = process.env.PORT || 3000;
var index;

var NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
	httpProxy = require('http-proxy'),
	routingProxy = new httpProxy.RoutingProxy(),
	app = express.createServer();

console.log('Starting Plex Client web server on port ' + port + ' in \'' + NODE_ENV + '\' environment');

function apiProxy(pattern) {
	return function (req, res, next) {
		if (req.url.match(pattern)) {
			req.url = req.url.replace(pattern, '');

			console.log('Proxying response at ' + req.url);

			return routingProxy.proxyRequest(req, res, {
				host: req.headers['x-plex-proxy-host'],
				port: req.headers['x-plex-proxy-port'],
				https: (req.headers['x-plex-proxy-port'] === '443')
			});
		} else {
			return next();
		}
	};
}

app.configure(function () {
	app.use(express.methodOverride());
	app.use(apiProxy(/\/api/));
	app.use(express.bodyParser());
	app.use(express.static(__dirname));
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
	app.use(app.router);
});

switch (NODE_ENV) {
	case 'production':
		index = 'https://plex.herokuapp.com/build/index.html';
		break;
	case 'development':
	default:
		index = '/app/index-dev.html';
		break;
}

app.get('/', function (req, res) {
	res.redirect(index);
});


app.listen(port);
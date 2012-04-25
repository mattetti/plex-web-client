var express = require('express'),
	httpProxy = require('http-proxy'),
	routingProxy = new httpProxy.RoutingProxy(),
	app = express.createServer();

function apiProxy(pattern) {
	return function (req, res, next) {
		if (req.url.match(pattern)) {
			req.url = req.url.replace(pattern, '');

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

app.get('/', function (req, res) {
	res.redirect('/app/index-dev.html');
});

app.listen(3000);
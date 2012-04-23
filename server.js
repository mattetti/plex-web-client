var express = require('express'),
	httpProxy = require('http-proxy'),
	routingProxy = new httpProxy.RoutingProxy(),
	apiProxy = function (pattern) {
		return function (req, res, next) {
			if (req.url.match(pattern)) {
				req.url = req.url.replace(pattern, '');

				console.log(req.headers);

				return routingProxy.proxyRequest(req, res, {
					host: req.headers['x-plex-proxy-host'],
					port: req.headers['x-plex-proxy-port']
				});
			} else {
				return next();
			}
		};
	},
	app = express.createServer();

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
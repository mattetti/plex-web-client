var express = require('express'),
	httpProxy = require('http-proxy'),
	routingProxy = new httpProxy.RoutingProxy(),
	apiProxy = function (pattern, host, port) {
		return function (req, res, next) {
			if (req.url.match(pattern)) {
				req.url = req.url.replace(/\/api/, '');

				console.log(req.url);

				return routingProxy.proxyRequest(req, res, {
					host: host,
					port: port
				});
			} else {
				return next();
			}
		};
	},
	app = express.createServer();

app.configure(function () {
	app.use(express.methodOverride());
	app.use(apiProxy(/\/api\/.*/, '192.168.1.4', 32400));
	app.use(express.bodyParser());
	app.use(express.static(__dirname));
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
	app.use(app.router);
});

app.get('/', function (req, res) {
	res.redirect('/app/index.html');
});

app.listen(3000);
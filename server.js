var express = require('express'),
	httpProxy = require('http-proxy'),
	routingProxy = new httpProxy.RoutingProxy(),
	app = express.createServer(),
	port = process.env.PORT || 3000,
	watch,
	index,
	less = require('less'),
	cssDirectory = './app/less',
	cssRootFile = 'plex.less';

console.log('Starting Plex Client web server on port ' + port + ' in \'' + process.env.NODE_ENV + '\' environment');

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

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	watch = require('watch');
	index = '/app/index-dev.html';
	watchFiles();
});

app.configure('production', function(){
	index = 'https://plex.herokuapp.com/index.html';
});

function watchFiles() {
	console.log('Development CSS processing active, monitoring "' + cssRootFile + '" in "' + cssDirectory + '"');

	var parser = new less.Parser({
		paths: [cssDirectory],
		filename: './app/less/plex.less'
	});

	var parse = function () {
		parser.parse('', function (error, tree) {
			if (error) return console.log(error);
			console.log(tree.toCSS());
		});
	};

	watch.createMonitor(cssDirectory, function (monitor) {
		monitor.on("created", function (file, stat) {
			console.log('CSS processing detected new file "' + file + '", generating new css file');
			parse();
		});
		monitor.on("changed", function (file, current, previous) {
			console.log('CSS processing detected file change "' + file + '", generating new css file');
			parse();
		});
		monitor.on("removed", function (file, stat) {
			console.log('CSS processing detected deleted file "' + file + '", generating new css file');
			parse();
		});
	});
}

app.get('/', function (req, res) {
	res.redirect(index);
});

app.listen(port);
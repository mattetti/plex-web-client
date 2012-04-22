var express = require('express'),
	httpProxy = require('http-proxy'),
	server = express.createServer();

var proxy = new httpProxy.RoutingProxy();
var apiHost = process.argv[2] ? process.argv[2] : 'local.staging.wayin.com';
var apiPort = process.argv[3] ? process.argv[3] : '8080';
var apiVersion = process.argv[4] ? process.argv[4] : '1.1';

function apiProxy(pattern, host, port) {
	return function(request, response, next) {
		if (request.url.match(pattern)) {
			proxy.proxyRequest(request, response, {host: host, port: port});
		} else {
			next();
		}
	}
}

server.configure(function () {
	server.use(apiProxy(new RegExp('\/' + apiVersion + '\/.*'), apiHost, apiPort));
	server.use(express.methodOverride());
	server.use(express.bodyParser());
	server.use(express.static(__dirname));
	server.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
	server.use(server.router);
});

// Ask widget
server.get('/ask', function (request, response) {
	response.redirect('/tibbr-wrapper/index.html');
});

server.listen(8888);
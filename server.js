var express = require('express');
var server = express();
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var proxyOptions = {
    changeOrigin: true
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);
var instagramUrl = 'https://api.instagram.com';

//SERVER SETUP
server.set('port', 8080);
server.use(express.static(__dirname + '/app'));

server.all("/v1/*", function(req, res) {
    console.log("Request made to /v1/");
    console.log(instagramUrl + req.url);
    apiProxy.web(req, res, {target: instagramUrl});
});

server.all("/app/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/app" });
});

server.all('/images/*', function(req, res, next) {
    res.sendfile("", { root: __dirname + '/app/images' });
});

server.all('/styles/*', function(req, res, next) {
    res.sendfile("", { root: __dirname + '/app/styles'});
}) 

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});


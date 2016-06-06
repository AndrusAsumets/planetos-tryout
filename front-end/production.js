require('dotenv').load();

var express = require('express');
var gzippo = require('gzippo');
var http = require('http');
var httpServer = http.Server(app);
var path = require('path');

var app = express()
app.use(gzippo.staticGzip(__dirname + '/public'));
app.use(gzippo.compress());

app.get('/', function(req, res) {
    res.sendFile('production.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT);

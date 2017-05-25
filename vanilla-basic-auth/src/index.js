var http = require('http');
var port = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello world');
}).listen(port, function () { console.log('server listening on port %s', port)});
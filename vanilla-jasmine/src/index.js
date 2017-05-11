var http = require('http');

var app = function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);
    res.end('Hello World');
};

var onListening = function () {
    var address = server.address();
    console.log('Server listening on [%s]:%s', address.address, address.port);
}

var server = http.createServer(app)
    .listen(process.env.PORT || 3000, onListening);

module.exports = server;
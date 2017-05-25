var express = require('express');
var app = new express();

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(process.env.PORT || 3100);

module.exports = app
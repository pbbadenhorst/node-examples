// see 	https://jasmine.github.io/2.1/node.html
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('./spec/support/jasmine.json');
jasmine.execute();
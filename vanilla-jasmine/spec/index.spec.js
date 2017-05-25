var coveralls = require('coveralls');
var jasmine = require('jasmine');

describe('Hello World Server', function () {

	describe('Server is not running', function() {

	});

	console.log('Start server before running specs.');
	var server = require('../src');
	console.log('Create agent for testing server.');
	var Agent = require('./helpers/agent');
	var agent = new Agent(server.address());

	afterAll(function(){
		console.log('\nClose server after running specs.');
		server.close(function() {
			console.log('Closed server.');
		});
	});

	describe('GET /', function () {
		it('returns with status code 200 and "Hello World" (text/plain)', function (done) {
			agent.get('/')
				.then(function (response) {
					expect(response.statusCode).toBe(200);
					expect(response.body).toBe('Hello World');
					expect(response.headers['content-type']).toBe('text/plain');
					done();
				});
		});
	});
});
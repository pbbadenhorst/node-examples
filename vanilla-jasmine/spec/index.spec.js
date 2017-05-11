var jasmine = require('jasmine');
var http = require('http');

var server = require('../src');
var Agent = require('./helpers/agent');
var agent = new Agent(server);

describe('Hello World Server', function () {
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

    it('returns with status code 200', function (done) {
      agent.get('/')
        .then(function (response) {
          expect(response.statusCode).toBe(200);
          done();
        });
    });

    it('returns with body "Hello World"', function (done) {
      agent.get('/')
        .then(function (response) {
          expect(response.body).toBe('Hello World');
          done();
        });
    });

    it('returns with content type "text/plain"', function (done) {
      agent.get('/')
        .then(function (response) {
          expect(response.headers['content-type']).toBe('text/plain');
          done();
        });
    });

  });
});
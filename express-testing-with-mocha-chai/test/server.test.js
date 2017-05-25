var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app/server');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
  describe('GET /', function() {
    it('Responds with status 200 and "Hello World"', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          
          done();
        });
    });
  });
});
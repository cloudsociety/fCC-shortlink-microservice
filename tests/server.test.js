var request = require('supertest');
var expect = require('expect');

var {app} = require('../index.js');

describe('Server', () => {
  describe('GET /', () => {
    it('should return index.html response', (done) => {
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });
  });
  // describe('TODO: GET /new/:url', () => {
  //   it('should return valid url object', (done) => {
  //     request(app)
  //     .get('/new/changeme')
  //     .expect(200)
  //     .end(done);
  //   });

  //   it('should return invalid url object', (done) => {
  //     request(app)
  //     .get('/new/shouldnotwork')
  //     .expect(200)
  //     .end(done);
  //   });
  // });
  // describe('TODO: GET /:shortid', () => {
  //   it('should redirect to another page', (done) => {
  //     request(app)
  //     .get('/shortid')
  //     .expect(200)
  //     .end(done);
  //   });

  //   it('should return 404, no shortlink found', (done) => {
  //     request(app)
  //     .get('/shouldnotwork')
  //     .expect(200)
  //     .end(done);
  //   });
  // });
});

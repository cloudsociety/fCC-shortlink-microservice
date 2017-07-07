var request = require('supertest');
var expect = require('expect');
var shortid = require('shortid');


var {app} = require('../index.js');
var {Link} = require('./../models/link.js');
var {links, populateLinks} = require('./seed/seed.js');

beforeEach(populateLinks);

describe('Server', () => {
  describe('GET /', () => {
    it('should return index.html response', (done) => {
      request(app)
      .get('/')
      .expect(200)
      .end(done);
    });
  });


  describe('TODO: GET /new/:url', () => {
    it('should return valid url object', (done) => {
      var original_url = 'https://www.freecodecamp.com';
      request(app)
      .get(`/new/${original_url}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.original_url).toBe(original_url);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Link.find({original_url}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].original_url).toBe(original_url);
          done();
        }).catch((e) => done(e));
      });
    });

    it('should return invalid url object', (done) => {
      var original_url = 'shouldnotwork';
      request(app)
      .get(`/new/${original_url}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Link.find({original_url}).then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
    });
  });


  describe('GET /:shortid', () => {
    it('should redirect to another page', (done) => {
      request(app)
      .get(`/${links[0]._id}`)
      .expect(302)
      .end(done);
    });

    it('should return 404, no shortlink found', (done) => {
      request(app)
      .get('/shouldnotwork')
      .expect(404)
      .end(done);
    });
  });
});

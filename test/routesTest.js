const mocha = require('mocha');
const chai = require('chai');
const app = require('../api/server');
const expect = chai.expect;
const supertest = require('supertest');

describe('Movies', () => {
  let agent;
  describe('Search movies', () => {
    beforeEach(() => {
      agent = supertest(app);
    });
    it('Can access /movies/search', () => {
      return agent
        .get('/api/movies/search?query=king')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.not.have.lengthOf(0);
        });
    });
  });
});

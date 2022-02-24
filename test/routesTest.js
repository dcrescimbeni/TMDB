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
        .then((response) => {
          expect(response.body).to.be.an('array');
          expect(response.body).to.not.have.lengthOf(0);
        });
    });

    it('Can get a specific movie', () => {
      return agent
        .get('/api/movies/movie/120')
        .expect(200)
        .then((response) => {
          expect(response.body.original_title).to.equals(
            'The Lord of the Rings: The Fellowship of the Ring'
          );
        });
    });
  });
});

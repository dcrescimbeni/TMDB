require('mocha');
const chai = require('chai');
const app = require('../api/server');
const expect = chai.expect;
const supertest = require('supertest');

describe('Media', () => {
  let agent;
  describe('Search media', () => {
    beforeEach(() => {
      agent = supertest(app);
    });
    it('Can search all media', () => {
      return agent
        .get('/api/media/search?query=king')
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an('array');
          expect(response.body).to.not.have.lengthOf(0);
        });
    });

    it('Can get a specific movie', () => {
      return agent
        .get('/api/media/single/120?type=movie')
        .expect(200)
        .then((response) => {
          expect(response.body.original_title).to.equals(
            'The Lord of the Rings: The Fellowship of the Ring'
          );
        });
    });

    it('Can get a specific tv show', () => {
      return agent
        .get('/api/media/single/79008?type=tv')
        .expect(200)
        .then((response) => {
          expect(response.body.original_name).to.equals(
            'Luis Miguel: La Serie'
          );
        });
    });
  });
});

describe('Users', () => {
  let agent;

  beforeEach(() => {
    agent = supertest(app);
  });
  describe('Create user', () => {
    it('Can create a new user', () => {
      return agent
        .post('/api/users/new')
        .send({
          username: 'Dino',
          password: 'test',
          email: 'dino@example.com',
        })
        .expect(201)
        .then((response) => response.body)
        .then((createdUser) => {
          expect(createdUser).to.have.property('username', 'Dino');
          expect(createdUser).to.have.property('password');
          expect(createdUser).to.have.property('email', 'dino@example.com');
          expect(createdUser.password).to.not.equal('test');
        });
    });
  });
});

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

  describe('User operations', () => {
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

  describe('Authentication', () => {
    describe('Login', () => {
      it('Can successfully login', () => {
        return agent
          .post('/api/login')
          .send({
            username: 'Dino',
            password: 'test',
          })
          .then((response) => {
            expect(response).to.have.property(
              'text',
              'Found. Redirecting to /api/secret'
            );
          });
      });

      it(`Can't login if entered wrong credentials`, () => {
        return agent
          .post('/api/login')
          .send({
            username: 'Dino',
            password: 'wrongPassword',
          })
          .then((response) => {
            expect(response).to.have.property(
              'text',
              'Found. Redirecting to /api/login'
            );
          });
      });
    });

    describe('Route navigation', () => {
      let session;

      beforeEach(() => {
        session = null;
      });

      it('Shows authenticated message when navigating to profile', () => {
        return agent
          .post('/api/login')
          .send({
            username: 'Dino',
            password: 'test',
          })
          .then((res) => {
            session = res.header['set-cookie'];
          })
          .then(() => agent.get('/api/users/user/dino').set('Cookie', session))
          .then((response) => {
            expect(response).to.have.property(
              'text',
              'user profile: authenticated'
            );
          });
      });

      it('Shows user NOT authenticated message when navigating to profile', () => {
        return agent
          .post('/api/login')
          .send({
            username: 'Dino',
            password: 'wrongPassword',
          })
          .then((res) => {
            session = res.header['set-cookie'];
          })
          .then(() => agent.get('/api/users/user/dino').set('Cookie', session))
          .then((response) => {
            expect(response).to.have.property(
              'text',
              'user profile: NOT authenticated'
            );
          });
      });

      it('User can logout', () => {
        return agent
          .post('/api/login')
          .send({
            username: 'Dino',
            password: 'test',
          })
          .then((res) => {
            session = res.header['set-cookie'];
          })
          .then(() => agent.get('/api/users/user/dino').set('Cookie', session))
          .then((response) => {
            expect(response).to.have.property(
              'text',
              'user profile: authenticated'
            );
          })
          .then((res) => {
            return agent.get('/api/logout').set('Cookie', session);
          })
          .then((res) => {
            expect(res).to.have.property(
              'text',
              'Found. Redirecting to /api/login'
            );
          });
      });
    });
  });
});

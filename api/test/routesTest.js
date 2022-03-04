require('mocha');
const after = require('mocha').after;
const before = require('mocha').before;
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const supertest = require('supertest');
const { User } = require('../models');

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

  after(() => {
    User.findOne({ where: { username: 'testdino' } })
      .then((res) => res.dataValues)
      .then((user) => User.destroy({ where: { username: user.username } }));
  });

  describe('User operations', () => {
    describe('Create user', () => {
      it('Can create a new user', () => {
        return agent
          .post('/api/users/new')
          .send({
            username: 'testDino',
            password: 'test',
            email: 'dino@example.com',
          })
          .expect(201)
          .then((response) => response.body)
          .then((createdUser) => {
            expect(createdUser).to.have.property('username', 'testdino');
            expect(createdUser).to.have.property('password');
            expect(createdUser).to.have.property('email', 'dino@example.com');
            expect(createdUser.password).to.not.equal('test');
          });
      });

      it('Checks for an existent user before creation', () => {
        return agent
          .get('/api/users/exist?q=testdino')
          .then((response) => response.body)
          .then((userExist) => {
            expect(userExist).to.equals(true);
          });
      });

      it('Checks for a non existent user before creation', () => {
        return agent
          .get('/api/users/exist?q=afsdflkj123098')
          .then((response) => response.body)
          .then((userExist) => {
            expect(userExist).to.equals(false);
          });
      });
    });

    describe('Search user', () => {
      before(() => {
        const users = [
          {
            username: 'fuzzysearch',
            password: 'test',
            email: 'fuzzy@asd.com',
            originalUsername: 'fuzzySearch',
          },
          {
            username: 'almostfuzzysearch',
            password: 'test',
            email: 'fuzzy@asd.com',
            originalUsername: 'almostFuzzySearch',
          },
          {
            username: 'notrelated',
            password: 'test',
            email: 'fuzzy@asd.com',
            originalUsername: 'notRelated',
          },
          {
            username: 'gettingfuzzy',
            password: 'test',
            email: 'fuzzy@asd.com',
            originalUsername: 'gettingFuzzy',
          },
        ];

        return User.bulkCreate(users);
      });

      after(() => {
        return User.destroy({
          where: {
            username: [
              'fuzzysearch',
              'almostfuzzysearch',
              'notrelated',
              'gettingfuzzy',
            ],
          },
        });
      });

      it('A get route exist', () => {
        return agent
          .get('/api/users/search?query=fuzzy')
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.lengthOf(3);
          });
      });

      it('Can search users ussing fuzzy matching', () => {});
    });
  });

  describe('User profile', () => {
    let session;

    before(() => {
      return User.create({
        username: 'someguy',
        password: 'test',
        email: 'test@test.com',
      });
    });

    after(() => {
      return User.destroy({ where: { username: 'someguy' } });
    });

    it('Can access another user profile', () => {
      return agent
        .get('/api/users/user/someGuy')
        .expect(200)
        .then((response) => response.body)
        .then((userDetails) => {
          expect(userDetails).to.have.property('username');
          expect(userDetails).to.have.property('isOwner', false);
        });
    });

    it('Can access own profile', () => {
      return agent
        .post('/api/login')
        .send({
          username: 'someguy',
          password: 'test',
        })
        .then((res) => {
          session = res.header['set-cookie'];
        })
        .then(() => agent.get('/api/users/user/someguy').set('Cookie', session))
        .then((response) => response.body)
        .then((userDetails) => {
          expect(userDetails).to.have.property('username');
          expect(userDetails).to.have.property('isOwner', true);
        });
    });
  });
});

describe('Authentication', () => {
  let agent;

  before('Creates a new user to use as login', () => {
    agent = supertest(app);

    return agent.post('/api/users/new').send({
      username: 'testlogin',
      password: 'test',
      email: 'dino@example.com',
    });
  });

  after('Deletes the created user', () => {
    return User.destroy({ where: { username: 'testlogin' } });
  });

  beforeEach(() => {});

  describe('Login', () => {
    it('Can successfully login', () => {
      return agent
        .post('/api/login')
        .send({
          username: 'testlogin',
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
          username: 'testlogin',
          password: 'wrongPassword',
        })
        .then((response) => {
          expect(response).to.have.property(
            'text',
            'Found. Redirecting to /api/login'
          );
        });
    });

    it(`Can't login if user does not exists`, () => {
      return agent
        .post('/api/login')
        .send({
          username: 'jkljasdflkjalsdf',
          password: 'test',
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

    it('User can logout', () => {
      return agent
        .post('/api/login')
        .send({
          username: 'testlogin',
          password: 'test',
        })
        .then((res) => {
          session = res.header['set-cookie'];
        })
        .then(() =>
          agent.get('/api/users/user/testlogin').set('Cookie', session)
        )
        .then((response) => response.body)
        .then((userData) => {
          expect(userData).to.have.property('isOwner', true);
        })
        .then((res) => {
          return agent.get('/api/logout').set('Cookie', session);
        })
        .then((res) => {
          console.log(res.text);
          expect(res).to.have.property('text', 'logout successful');
        });
    });
  });
});

describe('Favorites', () => {
  let session;
  let agent = supertest(app);

  before('Create a new user and authenticate it', () => {
    return agent
      .post('/api/users/new')
      .send({
        username: 'favoritetesting',
        password: 'test',
        email: 'dino@example.com',
      })
      .then(() => {
        return agent
          .post('/api/login')
          .send({ username: 'favoritetesting', password: 'test' });
      })
      .then((res) => (session = res.header['set-cookie']))
      .catch();
  });

  after('Delete user', () => {
    return User.findOne({
      where: { email: 'dino@example.com' },
    })
      .then((res) => res.dataValues)
      .then((user) => User.destroy({ where: { username: user.username } }))
      .catch(() => {});
  });

  describe('Getting favorites', () => {
    beforeEach('Create a new favorite', () => {
      return agent
        .post('/api/users/user/favoritetesting/fav')
        .set('Cookie', session)
        .send({
          mediaId: 120,
          type: 'movie',
        });
    });

    afterEach('Delete favorites', () => {
      return agent
        .delete('/api/users/user/favoritetesting/fav?mediaId=120&type=movie')
        .set('Cookie', session);
    });

    it('Should get a favorite', () => {
      return agent.get('/api/users/user/favoritetesting/fav').then((res) => {
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0].tmdbDetails).to.have.property(
          'original_title',
          'The Lord of the Rings: The Fellowship of the Ring'
        );
      });
    });
  });

  describe('Adding favorites', () => {
    after(() => {
      return agent
        .delete('/api/users/user/favoritetesting/fav?mediaId=424694&type=movie')
        .set('Cookie', session)
        .then(() => {
          return agent
            .delete(
              '/api/users/user/favoritetesting/fav?mediaId=424694&type=tv'
            )
            .set('Cookie', session)
            .send({
              mediaId: 424694,
              type: 'tv',
            });
        });
    });

    it('should add a new favorite', () => {
      return agent
        .post('/api/users/user/favoritetesting/fav')
        .set('Cookie', session)
        .send({
          mediaId: 424694,
          type: 'movie',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('userId');
          expect(res.body).to.have.property('mediaId', 424694);
          expect(res.body).to.have.property('type', 'movie');
        });
    });

    it(`Can't add a favorite with the same mediaId and type`, () => {
      return agent
        .post('/api/users/user/favoritetesting/fav')
        .set('Cookie', session)
        .send({
          mediaId: 424694,
          type: 'movie',
        })
        .expect(500);
    });

    it(`Can add a favorite with the same mediaId but different type`, () => {
      return agent
        .post('/api/users/user/favoritetesting/fav')
        .set('Cookie', session)
        .send({
          mediaId: 424694,
          type: 'tv',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('userId');
          expect(res.body).to.have.property('mediaId', 424694);
          expect(res.body).to.have.property('type', 'tv');
        });
    });
  });

  describe('Deleting favorites', () => {
    before('Create a new favorite', () => {
      return agent
        .post('/api/users/user/favoritetesting/fav')
        .set('Cookie', session)
        .send({
          mediaId: 9999,
          type: 'movie',
        });
    });
    it('Should delete a favorite', () => {
      return agent
        .delete('/api/users/user/favoritetesting/fav?mediaId=9999&type=movie')
        .set('Cookie', session)
        .expect(200)
        .then(() => {
          return agent.get('/api/users/user/favoritetesting/fav');
        })
        .then((res) => {
          console.log(res.body);
          expect(res.body).to.have.lengthOf(0);
        });
    });
  });
});

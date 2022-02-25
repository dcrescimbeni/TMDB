require('mocha');
const after = require('mocha').after;
const before = require('mocha').before;
const chai = require('chai');
const expect = chai.expect;
const { User, Favorite } = require('../api/models');
const db = require('../api/models/_db');

before(() => {
  db.sync({ force: false });
});

describe('User model', () => {
  after(() => {
    User.findOne({ where: { username: 'testDino' } })
      .then((res) => res.dataValues)
      .then((user) => User.destroy({ where: { username: user.username } }));
  });

  describe('Create new user', () => {
    it('Should create a user', () => {
      return User.create({
        username: 'testDino',
        password: 'test',
        email: 'dino@example.com',
      })
        .then((createdUser) => createdUser.dataValues)
        .then((user) => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('username');
          expect(user.username).to.equal('testDino');
          expect(user).to.have.property('password');
          expect(user.password).to.not.equals('test');
        })
        .catch((err) => console.log(err));
    });

    it(`username can't be null`, () => {
      return User.create({
        password: 'test',
        email: 'dino@example.com',
      })
        .then(() => {})
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });

    it(`password can't be null`, () => {
      return User.create({
        username: 'Dino',
        email: 'dino@example.com',
      })
        .then(() => {})
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });

    it(`email can't be null`, () => {
      return User.create({
        user: 'dino',
        password: 'test',
      })
        .then(() => {})
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });
  });
});

describe('Favorite model', () => {
  let testUserId;

  before('Creates a user', () => {
    const testUserDetails = {
      username: 'favoritestestuser',
      password: 'test',
      email: 'test@test.com',
    };

    return User.create(testUserDetails)
      .then((createdUser) => createdUser.dataValues)
      .then((user) => {
        testUserId = user.id;
      });
  });

  afterEach('Deletes created favorite', () => {
    return Favorite.destroy({ where: { userId: testUserId } });
  });

  after('Deletes the created test user', () => {
    return User.destroy({ where: { id: testUserId } });
  });

  describe('Favorite creation', () => {
    it('Can create a favorite', () => {
      return Favorite.create({
        mediaId: 120,
        userId: testUserId,
        type: 'movie',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.have.property('id');
          expect(favorite).to.have.property('mediaId');
          expect(favorite).to.have.property('userId');
        });
    });

    it(`Can't create a favorite without userId`, () => {
      return Favorite.create({
        mediaId: 120,
        type: 'movie',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.not.exist();
        })
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });
    it(`Can't create a favorite without mediaId`, () => {
      return Favorite.create({
        userId: testUserId,
        type: 'movie',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.not.exist();
        })
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });
    it(`Can't create a favorite without type`, () => {
      return Favorite.create({
        userId: testUserId,
        mediaId: 120,
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.not.exist();
        })
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });
    it(`Can't assign a non-specified type to a favorite`, () => {
      return Favorite.create({
        userId: testUserId,
        mediaId: 120,
        type: 'otherType',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.not.exist();
        })
        .catch((err) => {
          expect(err.name).to.equal('SequelizeDatabaseError');
        });
    });
  });
});

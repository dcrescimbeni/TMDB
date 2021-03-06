require('mocha');
const after = require('mocha').after;
const before = require('mocha').before;
const chai = require('chai');
const expect = chai.expect;
const { User, Favorite } = require('../models');
const db = require('../models/_db');

before(() => {
  db.sync({ force: false });
});

describe('User model', () => {
  let testUserDetails = {
    username: 'testUserDino',
    password: 'test',
    email: 'test@example.com',
  };

  const { username, password, email } = testUserDetails;

  afterEach(() => {
    return User.findOne({
      where: { email: 'test@example.com' },
    })
      .then((res) => res.dataValues)
      .then((user) => User.destroy({ where: { username: user.username } }))
      .catch(() => {});
  });

  describe('Create new user', () => {
    it('Should create a user', () => {
      return User.create(testUserDetails)
        .then((createdUser) => createdUser.dataValues)
        .then((user) => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('username');
          expect(user.username).to.equal('testuserdino');
          expect(user).to.have.property('password');
          expect(user.password).to.not.equals('test');
        });
    });

    it('Can create username with numbers', () => {
      return User.create({
        username: 'test123dino',
        password,
        email,
      })
        .then((createdUser) => createdUser.dataValues)
        .then((user) => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('username');
          expect(user.username).to.equal('test123dino');
          expect(user).to.have.property('password');
          expect(user.password).to.not.equals('test');
        });
    });

    it('Must have unique username', () => {
      return User.create(testUserDetails)
        .then(() => User.create(testUserDetails))
        .then((result) => {
          expect.fail();
        })
        .catch((err) => {
          expect(err.errors[0].type).to.equal('unique violation');
        });
    });

    it('User must retain its original username', () => {
      return User.create({
        username: 'testOriginalUsername',
        password,
        email,
      })
        .then((createdUser) => createdUser.dataValues)
        .then((user) => {
          expect(user).to.have.property('id');
          expect(user).to.have.property('username');
          expect(user.username).to.equal('testoriginalusername');
          expect(user).to.have.property('originalUsername');
          expect(user.originalUsername).to.equal('testOriginalUsername');
        });
    });

    it('Username cannot be less than 3 characters', () => {
      return User.create({
        username: 'as',
        password,
        email,
      })
        .then((createdUser) => createdUser.dataValues)
        .then((newUser) => {
          expect(newUser).to.not.have.property('id');
        })
        .catch((err) => {
          expect(err.errors).to.have.lengthOf(1);
          // expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });

    it('Username cannot be more than 23 characters', () => {
      return User.create({
        username: 'asdflkjhiqqwekhjasdfasdf',
        password,
        email,
      })
        .then((createdUser) => createdUser.dataValues)
        .then((newUser) => {
          expect(newUser).to.not.have.property('id');
        })
        .catch((err) => {
          expect(err.errors).to.have.lengthOf(1);
          // expect(err.errors[0].type).to.equal('notNull Violation');
        });
    });
  });

  describe('User creation validations', () => {
    describe('Null validations', () => {
      it(`username can't be null`, () => {
        return User.create({
          password,
          email,
        })
          .then(() => {})
          .catch((err) => {
            expect(err.errors[0].type).to.equal('notNull Violation');
          });
      });

      it(`password can't be null`, () => {
        return User.create({
          username,
          email,
        })
          .then(() => {})
          .catch((err) => {
            expect(err.errors[0].type).to.equal('notNull Violation');
          });
      });

      it(`email can't be null`, () => {
        return User.create({
          username,
          password,
        })
          .then(() => {})
          .catch((err) => {
            expect(err.errors[0].type).to.equal('notNull Violation');
          });
      });
    });

    describe('Custom validations', () => {
      it('Cannot have special characters: @', () => {
        return User.create({
          username: '@dino',
          password,
          email,
        })
          .then((user) => {
            expect(user).to.not.exist();
          })
          .catch((err) => {
            expect(err.errors[0].type).to.equal('Validation error');
          });
      });

      it('Cannot have special characters: !', () => {
        return User.create({
          username: '!dino',
          password,
          email,
        })
          .then((user) => {
            expect(user).to.not.exist();
          })
          .catch((err) => {
            expect(err.errors[0].type).to.equal('Validation error');
          });
      });

      it('Cannot have special characters: #', () => {
        return User.create({
          username: '#dino',
          password,
          email,
        })
          .then((user) => {
            expect(user).to.not.exist();
          })
          .catch((err) => {
            expect(err.errors[0].type).to.equal('Validation error');
          });
      });
    });
  });
});

describe('Favorite model', () => {
  let testUserId;

  before('Creates a user', () => {
    const testUserDetails = {
      username: 'randomUser098032',
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
          expect(err.name).to.equal('SequelizeValidationError');
        });
    });

    it(`Can't duplicate a favorite with the same mediaId and type`, () => {
      return Favorite.create({
        mediaId: 400,
        userId: testUserId,
        type: 'movie',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.have.property('id');
          expect(favorite).to.have.property('mediaId', 400);
          expect(favorite).to.have.property('userId');
        })
        .then(() => {
          return Favorite.create({
            mediaId: 400,
            userId: testUserId,
            type: 'movie',
          });
        })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          console.log('FAVORITE DUPLICATION');
          console.log(favorite);
          expect(favorite).to.not.exist();
        })
        .catch((err) => {
          console.log(err);
          expect(err.message).to.equal('Validation error: Duplicated favorite');
        });
    });

    it(`Can save a favorite with the same mediaId and different type`, () => {
      return Favorite.create({
        mediaId: 400,
        userId: testUserId,
        type: 'movie',
      })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.have.property('id');
          expect(favorite).to.have.property('mediaId', 400);
          expect(favorite).to.have.property('type', 'movie');
          expect(favorite).to.have.property('userId');
        })
        .then(() => {
          return Favorite.create({
            mediaId: 400,
            userId: testUserId,
            type: 'tv',
          });
        })
        .then((createdFavorite) => createdFavorite.dataValues)
        .then((favorite) => {
          expect(favorite).to.have.property('id');
          expect(favorite).to.have.property('mediaId', 400);
          expect(favorite).to.have.property('type', 'tv');
          expect(favorite).to.have.property('userId');
        })
        .catch((err) => {
          expect(err).to.not.exist();
        });
    });
  });
});

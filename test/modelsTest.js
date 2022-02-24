require('mocha');
const chai = require('chai');
const expect = chai.expect;
const { User } = require('../api/models');

// TODO: Not all deletes after the tests are working. There's still a user left

describe('User model', () => {
  afterEach(() => {
    User.findAll({ where: { username: 'testDino' } })
      .then((res) => res.dataValues)
      .then((user) => User.destroy({ where: { username: user.username } }))
      .then(() => {});
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
          expect(user).to.have.property('username', 'Dino');
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

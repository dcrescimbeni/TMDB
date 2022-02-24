const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const db = require('../api/models/_db');
const { User } = require('../api/models');
const { Movie } = require('../api/models');

describe('User model', () => {
  // beforeEach(() => {
  //   return db.sync({ force: true });
  // });

  it('Should create a user', () => {
    return User.create({
      username: 'Dino',
      password: 'test',
      email: 'dino@example.com',
    })
      .then((createdUser) => createdUser.dataValues)
      .then((user) => {
        expect(user).to.have.property('id');
        expect(user).to.have.property('username', 'Dino');
        expect(user).to.have.property('password', 'test');
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

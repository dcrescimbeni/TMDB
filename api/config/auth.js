const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const verifyCallback = (username, password, done) => {
  username = username.toLowerCase();
  User.findOne({ where: { username } })
    .then((res) => {
      if (!res) {
        done(null, false);
        return;
      }
      let user = res.dataValues;
      bcrypt.compare(password, user.password).then((isValid) => {
        if (isValid) done(null, user);
        else done(null, false);
      });
    })
    .catch((err) => done(err));
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

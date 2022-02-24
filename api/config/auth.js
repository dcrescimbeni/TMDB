const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const verifyCallback = (username, password, done) => {
  User.findOne({ where: { username } })
    .then((res) => res.dataValues)
    .then((user) => {
      console.log(user);
      if (!user) done(null, false);
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

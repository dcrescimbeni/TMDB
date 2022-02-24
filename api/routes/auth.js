const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const authController = require('../controllers/authController');
const authRouter = express.Router();

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
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

// ROUTES

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/api/login',
    successRedirect: '/api/secret',
  })
);

authRouter.get('/login', (req, res, next) => {
  res.send(`login page`);
});
authRouter.get('/secret', (req, res, next) => {
  res.send(`You've accessed the chamber of forbidden secrets`);
});

module.exports = authRouter;

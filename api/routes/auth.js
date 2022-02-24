const express = require('express');
// const authController = require('../controllers/authController');
const authRouter = express.Router();
const passport = require('passport');

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
  res.status(205).send(`You've accessed the chamber of forbidden secrets`);
});

module.exports = authRouter;

const express = require('express');
const authController = require('../controllers/authController');
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

authRouter.get('/login', authController.loginGet);
authRouter.get('/logout', authController.logoutGet);
authRouter.get('/secret', authController.secretGet);

module.exports = authRouter;

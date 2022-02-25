const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const isOwnUser = require('../controllers/authController').isOwnUser;

usersRouter.post('/new', usersController.usersCreateNew);
usersRouter.get('/user/:username', usersController.usersProfile);
usersRouter.get('/search', usersController.usersSearch);

// Favorites routes

usersRouter.get('/user/:username/fav', usersController.usersFavList);

usersRouter.post(
  '/user/:username/fav',
  isOwnUser,
  usersController.usersFavPost
);

usersRouter.delete(
  '/user/:username/fav',
  isOwnUser,
  usersController.usersFavDelete
);

module.exports = usersRouter;

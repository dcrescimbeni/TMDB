const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.post('/new', usersController.usersCreateNew);

usersRouter.get('/user/:username', usersController.usersOwnProfile);

module.exports = usersRouter;

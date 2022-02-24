const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController');

moviesRouter.use('/search', moviesController.moviesSearchGet);
moviesRouter.use('/movie/:id', moviesController.moviesGetOneMovie);

module.exports = moviesRouter;

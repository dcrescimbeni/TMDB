const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController');

moviesRouter.use('/search', moviesController.moviesSearchGet);

module.exports = moviesRouter;

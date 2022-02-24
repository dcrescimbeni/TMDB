const express = require('express');
const mediaRouter = express.Router();
const mediaController = require('../controllers/mediaController');

mediaRouter.get('/search', mediaController.mediaSearchGet);
mediaRouter.get('/single/:id', mediaController.mediaGetSingle);

module.exports = mediaRouter;

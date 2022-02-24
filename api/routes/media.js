const express = require('express');
const mediaRouter = express.Router();
const mediaController = require('../controllers/mediaController');

mediaRouter.use('/search', mediaController.mediaSearchGet);
mediaRouter.use('/single/:id', mediaController.mediaGetSingle);

module.exports = mediaRouter;

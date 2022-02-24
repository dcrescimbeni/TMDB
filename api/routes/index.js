const express = require('express');
const router = express.Router();
const movies = require('./movies');

router.use('/movies', movies);

module.exports = router;

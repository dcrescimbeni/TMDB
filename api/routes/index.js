const express = require('express');
const router = express.Router();
const media = require('./media');

router.use('/media', media);

module.exports = router;

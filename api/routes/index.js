const express = require('express');
const router = express.Router();
const media = require('./media');
const users = require('./users');

router.use('/media', media);
router.use('/users', users);

module.exports = router;

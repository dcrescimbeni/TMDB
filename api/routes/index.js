const express = require('express');
const router = express.Router();
const media = require('./media');
const users = require('./users');
const auth = require('./auth');

router.use('/media', media);
router.use('/users', users);
router.use('/', auth);

module.exports = router;

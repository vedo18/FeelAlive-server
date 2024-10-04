const router = require('express').Router();

router.use('/signup', require('./auth.routes'));

module.exports = router;

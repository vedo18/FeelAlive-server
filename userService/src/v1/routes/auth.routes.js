const router = require('express').Router();

const { signUp } = require('../controllers/auth.controller');
const { validateBody } = require('../../middlewares/index');
const { authSchema } = require('../schemas/index');

router.post('/', validateBody(authSchema.signup), signUp);

module.exports = router;

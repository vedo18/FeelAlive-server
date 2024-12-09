const router = require('express').Router();

const { signUp, login, verifyOTP } = require('../controllers/auth.controller');
const { validateBody } = require('../../middlewares/index');
const { authSchema } = require('../schemas/index');

router.post('/signup', validateBody(authSchema.signup), signUp);
router.post('/login', validateBody(authSchema.login), login);
router.post('/verify-otp', validateBody(authSchema.verifyOTP), verifyOTP);

module.exports = router;

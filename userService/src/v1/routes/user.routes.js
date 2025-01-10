const router = require('express').Router();

const { updateUser, getUser } = require('../controllers/user.controller');

const { validateBody } = require('../../middlewares/index');

const { userSchema } = require('../schemas/index');

router
  .route('/:id')
  .post(validateBody(userSchema.updateUser), updateUser)
  .get(validateBody(userSchema.getUser), getUser);

module.exports = router;

const Joi = require('joi');

const updateUser = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  password: Joi.string().min(6),
});

const getUser = Joi.object({
  params: Joi.object({
    id: Joi.string().guid().required(),
  }),
});

module.exports = {
  updateUser,
  getUser,
};

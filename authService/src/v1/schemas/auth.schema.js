const Joi = require('joi');

const signup = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.number(),
  password: Joi.string().min(6).required(),
});

const verifyOTP = Joi.object({
  phoneNumber: Joi.number().required(),
  otp: Joi.number().required(),
});

const login = Joi.object({
  phoneNumber: Joi.number().required(),
});

module.exports = {
  signup,
  verifyOTP,
  login,
};

const Joi = require('joi');

const signup = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    signup,
};

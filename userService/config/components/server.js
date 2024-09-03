const Joi = require('joi');

const schema = Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    PORT: Joi.string().required(),
});

const { error, value: envVars } = schema.validate(process.env);

const config = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === 'test',
    isDevelopment: envVars.NODE_ENV === 'development',
    isProduction: envVars.NODE_ENV === 'production',
    port: envVars.PORT,
};

module.exports = config;

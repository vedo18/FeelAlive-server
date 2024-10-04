const Joi = require('joi');

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
  PORT: Joi.string().required(),
  DB_STRING: Joi.string().required(),
}).unknown(); // Allow unknown keys

const { error, value: envVars } = schema.validate(process.env);

if (error) {
  console.error(
    'Config validation error:',
    error.details.map((d) => d.message).join(', ')
  );
  process.exit(1);
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  isProduction: envVars.NODE_ENV === 'production',
  port: envVars.PORT,
  dbString: envVars.DB_STRING,
};

module.exports = config;

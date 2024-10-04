const jwt = require('jsonwebtoken');
const { server } = require('../../config/index');

module.exports.generateToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: server.jwtExpirationTime,
  };

  const token = jwt.sign(payload, server.jwtSecret, options);

  return token;
};

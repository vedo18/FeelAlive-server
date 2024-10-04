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

  return jwt.sign(payload, server.jwtSecret, options);
};

module.exports.generateRefreshToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const options = {
    expiresIn: '7d',
  };
  return jwt.sign(payload, server.jwtRefreshSecret, options);
};

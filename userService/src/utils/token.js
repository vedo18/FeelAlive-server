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
    expiresIn: server.jwtRefreshExpirationTime,
  };
  return jwt.sign(payload, server.jwtRefreshSecret, options);
};

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

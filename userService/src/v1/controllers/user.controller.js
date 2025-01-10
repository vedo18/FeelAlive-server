const { User } = require('../../models/index');
const { asyncHandler } = require('../../middlewares/index');

module.exports.updateUser = asyncHandler(async (req, res) => {
  res.send({ error: false, message: 'User updated successfully' });
});

module.exports.getUser = asyncHandler(async (req, res) => {
  res.send({ error: false, message: 'User fetched successfully' });
});

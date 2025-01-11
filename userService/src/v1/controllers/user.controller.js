const { User } = require('../../models/index');
const { asyncHandler } = require('../../middlewares/index');

module.exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({ error: true, message: 'User not found' });
  }

  if (body.fullName) user.fullName = body.fullName;
  if (body.email) user.email = body.email;

  await user.save();

  res.send({ error: false, message: 'User updated successfully', user });
});

module.exports.getUser = asyncHandler(async (req, res) => {
  res.send({ error: false, message: 'User fetched successfully' });
});

const bcrypt = require('bcryptjs');
const { User } = require('../../models/index');
const { asyncHandler } = require('../../middlewares/index');
const { generateToken, generateRefreshToken } = require('../../utils/token');
const { generateOTP, sendOTP } = require('../../utils/otp');

module.exports.signUp = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log('data', data);

  const ifExistingUser = await User.findOne({ email: data.email });

  if (ifExistingUser && ifExistingUser.isEmailVerified)
    return res.send({ error: true, message: ' User Already Exist' });

  if (ifExistingUser && !ifExistingUser.isEmailVerified) {
    //TODO: return with otp to their email address
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const username = data.username ? data.username : undefined;

  const user = await User.create({
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    isEmailVerified: false, // For now set it to false until verified by email verification process
    password: hashedPassword,
    username,
  });

  const generatedOTP = await generateOTP();
  console.log(
    '🚀 ~ module.exports.signUp=asyncHandler ~ generatedOTP:',
    generatedOTP
  );

  await sendOTP(data.phoneNumber, generatedOTP);
  console.log('otp sent successfully');

  const updatedUser = await User.findOneAndUpdate(
    { phoneNumber: data.phoneNumber },
    { otp: generatedOTP },
    { new: true }
  );

  const accessToken = await generateToken(user);
  const refreshToken = await generateRefreshToken(user);

  res.send({ user: user, token: { accessToken, refreshToken } });
});

module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: data.email });

  if (!user) return res.send({ error: true, message: ' User Does not Exist' });

  if (ifExistingUser && !ifExistingUser.isEmailVerified) {
    //TODO: return with otp to their email address
  }

  // const encPassword =  TODO : Add bcrypt

  const accessToken = await generateToken(user);
  const refreshToken = await generateRefreshToken(user);

  res.send({ user: user, token: { accessToken, refreshToken } });
});

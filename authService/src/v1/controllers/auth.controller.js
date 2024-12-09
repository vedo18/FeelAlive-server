const bcrypt = require('bcryptjs');
const { User } = require('../../models/index');
const { asyncHandler } = require('../../middlewares/index');
const { generateToken, generateRefreshToken } = require('../../utils/token');
const { generateOTP, sendOTP } = require('../../utils/otp');

module.exports.signUp = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log('data', data);

  const ifExistingUser = await User.findOne({ email: data.email });

  if (ifExistingUser && ifExistingUser.isPhoneVerified)
    return res.send({ error: true, message: 'User Already Exist' });

  if (ifExistingUser && !ifExistingUser.isPhoneVerified) {
    const generatedOTP = await generateOTP();

    await sendOTP(data.phoneNumber, generatedOTP);

    await User.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      { otp: generatedOTP.toString() },
      { new: true }
    );

    res.send({ error: false, message: ' OTP sent successfully.' });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const username = data.username ? data.username : undefined;

  await User.create({
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    isEmailVerified: false, // For now set it to false until verified by email verification process
    password: hashedPassword,
    username,
  });

  const generatedOTP = await generateOTP();

  await sendOTP(data.phoneNumber, generatedOTP);

  await User.findOneAndUpdate(
    { phoneNumber: data.phoneNumber },
    { otp: generatedOTP.toString() },
    { new: true }
  );

  res.send({ error: false, message: ' OTP sent successfully.' });
});

module.exports.verifyOTP = asyncHandler(async (req, res) => {
  const data = req.body;
  console.log('data', data);

  const ifExistingUser = await User.findOne({ phoneNumber: data.phoneNumber });

  if (!ifExistingUser) {
    return res.send({ error: true, message: ' User Not Found' });
  }

  if (data.otp.toString() !== ifExistingUser.otp) {
    return res.send({ error: true, message: 'Invalid OTP' });
  }

  if (!ifExistingUser.isPhoneVerified) {
    await User.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      { isPhoneVerified: true },
      { new: true }
    );
  }

  const accessToken = await generateToken(ifExistingUser);
  const refreshToken = await generateRefreshToken(ifExistingUser);

  res.send({ user: ifExistingUser, token: { accessToken, refreshToken } });
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

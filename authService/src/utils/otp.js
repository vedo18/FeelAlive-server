const unirest = require('unirest');

const config = require('../../config/index');

module.exports.generateOTP = async (length = 6) => {
  if (length <= 0) {
    throw new Error('OTP length must be greater than 0');
  }
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

module.exports.sendOTP = async (phoneNumber, otp) => {
  console.log('🚀 Sending OTP:', phoneNumber, otp);

  try {
    const req = unirest('POST', 'https://www.fast2sms.com/dev/bulkV2');

    req.headers({
      authorization: config.server.OTP_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Use form for "otp" route
    req.form({
      variables_values: otp, // OTP value
      route: 'otp', // Route for OTPs
      numbers: phoneNumber, // Comma-separated phone numbers
    });

    console.log('reqqqqq', req);

    req.end((res) => {
      if (res.error) {
        console.error('Error sending SMS:', res.error);
      } else {
        console.log('SMS sent successfully:', res.body);
      }
    });
  } catch (error) {
    console.error('Error occurred while sending OTP:', error);
  }
};

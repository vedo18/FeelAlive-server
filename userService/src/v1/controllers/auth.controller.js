const { User } = require('../../models/index');

module.exports.signUp = async (req, res) => {
    const data = req.body;
    console.log('data', data);

    const ifExistingUser = await User.findOne({ email: data.email });

    if (ifExistingUser && ifExistingUser.isEmailVerified)
        return res.send({ error: true, message: ' User Already Exist' });

    if (ifExistingUser && !ifExistingUser.isEmailVerified) {
        //TODO: return with otp to their email address
    }

    // const encPassword =  TODO : Add bcrypt

    const user = await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
    });

    res.send({ user: user });
};

const { User } = require('../../models/index');

module.exports.signUp = async (req, res) => {
    const { data } = req.body;

    const user = User.create(data);

    res.send(user);
};

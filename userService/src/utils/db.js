const mongoose = require('mongoose');
const config = require('../../config/index');

const DB_STRING = config.server.dbString;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

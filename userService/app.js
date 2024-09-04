require('dotenv').config();
const express = require('express');
const config = require('./config/index');
const connectDB = require('./src/utils/db');

const app = express();
connectDB();

app.listen(config.server.port, () => {
    console.log('listening on', process.env.PORT);
});

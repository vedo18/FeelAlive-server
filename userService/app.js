require('dotenv').config();
const express = require('express');
const config = require('./config/index');

const app = express();

app.listen(config.server.port, () => {
    console.log('listening on', process.env.PORT);
});

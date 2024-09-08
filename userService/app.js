require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const logger = require('./src/utils/logger');

const config = require('./config/index');
const connectDB = require('./src/utils/db');

const app = express();
connectDB();

app.use(express.json());

const morganFormat = ':method :url :status :response-time ms';

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(' ')[0],
                    url: message.split(' ')[1],
                    status: message.split(' ')[2],
                    responseTime: message.split(' ')[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

app.get('/', (req, res) => {
    res.send('Hello from Feel Alive!');
});

app.use('/api/v1', require('./src/v1/routes/index'));

app.listen(config.server.port, () => {
    console.log('Server running');
});

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const moment = require('moment');
const routerV1 = require('./routes/api_v1');
const {
  userAgentEncrypt
} = require('./helper/requestCheck')
const {
  errorResponse
} = require('./helper/response')

const accessLogStream = (filelog) => rfs.createStream(`${filelog}.log`, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})

const app = express();

app.use(cors());
app.use(helmet());
app.use(userAgentEncrypt)

app.use(logger('combined'));
app.use(logger('combined', { stream: accessLogStream(`${moment().format('YYYYMMDD')}_access`)}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routerV1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  errorResponse(res, 404)
});

module.exports = app;

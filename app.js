const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./models/entity');

const login = require('./routes/login');
const test = require('./routes/test');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false,limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use((req,res,next) => {
  next();
});

app.use('/test',test);
app.use('/login',login);

module.exports = app;
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const authJwt = require('./middleware/authJwt');

require('./models');

const login = require('./controllers/login');
const test = require('./controllers/test');
const users = require('./controllers/users');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false,limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use((req,res,next) => {
  next();
});

app.use('/test', authJwt, test);
app.use('/users',users);
app.use('/login',login);

module.exports = app;
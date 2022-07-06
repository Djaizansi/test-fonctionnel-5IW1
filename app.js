const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const authJwt = require('./middleware/authJwt');

require('./models');

const login = require('./router/login');
const users = require('./router/users');
const categories = require('./router/categories');
const projects = require('./router/projects');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false,limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use((req,res,next) => {
  next();
});

app.use('/users',users);
app.use('/categories',categories);
app.use('/projects',projects);
app.use('/login',login);

module.exports = app;
const models = require('../models');
const User = models.User;
const Project = models.Project;
const Category = models.Category;
const bcrypt = require('bcryptjs');
const generateAccessToken = require("../jwt/generateAccesToken");
const UserRole = require("../enum/UserRole");

exports.UserController = require('./UserController')(User);
exports.LoginController = require('./LoginController')(User, bcrypt, generateAccessToken);
exports.ProjectController = require('./ProjectController')(Project, UserRole);
exports.CategoryController = require('./CategoryController')(Category, UserRole);
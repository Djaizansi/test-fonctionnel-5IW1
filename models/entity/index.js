const sequelize = require('../connection');
const User = require('./user');
const Project = require("./project");

//Décommentez ceci pour enregistrer en base les nouvelles modification
// sequelize
//   .sync({ force: true })
//   .then((result) => console.log("All models were synchronized successfully."))
//   .catch((result) => console.error(result, "Error with models synchronization"));

module.exports = {
  sequelize,
  User,
  Project
};
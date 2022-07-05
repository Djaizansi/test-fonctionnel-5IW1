'use strict';
const UserRole = require("../enum/UserRole");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Votre email n\'est pas valide'
          }
        }
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.ENUM(UserRole.ADMIN, UserRole.USER),
        defaultValue: UserRole.USER
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
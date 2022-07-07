'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const UserRole = require('../enum/UserRole');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Project,{foreignKey: "user_id", as: "projects", onDelete: "CASCADE", onUpdate: "CASCADE"});
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Votre email n\'est pas valide'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN),
      defaultValue: UserRole.USER
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  const hashPassword = async (user) => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  };

  User.addHook("beforeCreate", hashPassword);
  User.addHook("beforeUpdate", async (user, { fields }) => {
    if (fields.includes("password")) {
      await hashPassword(user);
    }
  });

  return User;
};
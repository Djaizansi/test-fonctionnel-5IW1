'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
      Project.belongsTo(models.Category,{foreignKey: 'category_id', as: 'category'});
    }
  }
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: DataTypes.DATE,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    freezeTableName: true,
  });
  return Project;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Project,{foreignKey: "category_id", as: "projects", onDelete: "NULL", onUpdate: "CASCADE"});
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    freezeTableName: true,
  });
  return Category;
};
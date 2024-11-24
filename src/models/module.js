'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.hasMany(models.Level, { foreignKey: 'module_id' });
    }
  }
  Module.init({
    name: {
      type : DataTypes.STRING,
      field : 'name'
    },
    level: {
      type : DataTypes.INTEGER,
      field : 'level'
    }
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};
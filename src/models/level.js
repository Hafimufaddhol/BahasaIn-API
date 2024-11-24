'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi dengan Module
      Level.belongsTo(models.Module, { foreignKey: 'module_id'});

      // Relasi dengan Quiz
      Level.hasMany(models.Quiz, { foreignKey: 'level_id'});
      Level.hasMany(models.UserProgress, {
        foreignKey: 'level_id' // This is the reverse of the belongsTo association
      });
    }
  }
  Level.init({
    moduleId: {
      type: DataTypes.INTEGER,
      field: 'module_id'
    },
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    order : {
      type : DataTypes.INTEGER,
      field: 'order'
    }
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};
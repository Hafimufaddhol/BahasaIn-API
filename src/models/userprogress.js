'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi dengan User
      UserProgress.belongsTo(models.User, { foreignKey: 'user_id' });

      // Relasi dengan Module
      UserProgress.belongsTo(models.Module, { foreignKey: 'module_id' });

      // Relasi dengan Level
      UserProgress.belongsTo(models.Level, { foreignKey: 'level_id' });
    }
  }
  UserProgress.init({
    userId: {
      type: DataTypes.STRING,
      field: 'user_id'
    },
    moduleId: {
      type: DataTypes.INTEGER,
      field: 'module_id'
    },
    levelId: {
      type: DataTypes.INTEGER,
      field: 'level_id'
    },
    completed: {
      type: DataTypes.BOOLEAN,
      field: 'completed'
    },
    lastAccessed: {
      type: DataTypes.DATE,
      field: 'last_accessed'
    },
    score: {
      type: DataTypes.INTEGER,
      field: 'score'
    }
  }, {
    sequelize,
    modelName: 'UserProgress',
  });
  return UserProgress;
};
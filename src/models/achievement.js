'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Achievement.belongsToMany(models.User, {
        through: models.UserAchievement,
        foreignKey: 'achievement_id',
        otherKey: 'user_id',
        as: 'users',
      });
    }
  }
  Achievement.init({
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING,
      field: 'description'
    }
  }, {
    sequelize,
    modelName: 'Achievement',
  });
  return Achievement;
};
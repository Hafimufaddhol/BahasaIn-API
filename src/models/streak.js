'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Streak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Streak.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Streak.init({
    userId: {
      type: DataTypes.STRING,
      field: 'user_id'
    },
    streak: {
      type: DataTypes.INTEGER,
      field: 'streak'
    },
    lastActivity: {
      type: DataTypes.DATE,
      field: 'last_activity'
    }
  }, {
    sequelize,
    modelName: 'Streak',
  });
  return Streak;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi dengan Level
      Quiz.belongsTo(models.Level, { foreignKey: 'level_id' });

      Quiz.hasMany(models.QuizOption, {
        foreignKey: 'quiz_id' 
      });

      // Relasi dengan QuizOptions
      Quiz.hasMany(models.Image, {
        foreignKey: 'entity_id',
        constraints: false,
        scope: {
          entity_type: 'quiz',
        },
        as: 'images',
      });

    }
  }
  Quiz.init({
    levelId: {
      type: DataTypes.INTEGER,
      field: 'level_id'
    },
    type: {
      type: DataTypes.ENUM('essay', 'option'),
      field: 'type'
    },
    question: {
      type: DataTypes.STRING,
      field: 'question'
    },
    explanation:{
      type : DataTypes.JSON,
      field : 'explanation'
    },
    answer: {
      type: DataTypes.STRING,
      field: 'answer'
    }
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};
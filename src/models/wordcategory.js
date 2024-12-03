'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WordCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WordCategory.belongsTo(models.Word, {
        foreignKey: 'word_id',
      });
            
    }
  }
  WordCategory.init({
    wordId: DataTypes.INTEGER,
    translate:DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    example: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'WordCategory',
    underscored: true,  
  });
  return WordCategory;
};
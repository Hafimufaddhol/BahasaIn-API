'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historical extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Historical.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mapLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Historical',
      underscored: true,
      timestamps: false, // Since created_at and updated_at are handled manually
    }
  );
  return Historical;
};

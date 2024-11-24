'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // Relasi dengan User
      Token.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Token.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_id'
      },
      type: {
        type: DataTypes.ENUM('refresh', 'reset'),
        allowNull: false,
        field: 'type'
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'token'
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
      },
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );

  return Token;
};

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relasi dengan tabel Streak
      User.hasOne(models.Streak, { foreignKey: 'user_id'});

      // Relasi dengan tabel Tokens
      User.hasMany(models.Token, { foreignKey: 'user_id', as: 'tokens' });

      // Relasi dengan tabel UserAchievements (Many-to-Many dengan Achievements)
      User.belongsToMany(models.Achievement, {
        through: models.UserAchievement,
        foreignKey: 'user_id',
        otherKey: 'achievement_id',
      });

      // Relasi dengan tabel UserProgress
      User.hasMany(models.UserProgress, { foreignKey: 'user_id', as: 'progress' });
    }

    // Verifikasi refresh token
  }

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => nanoid(10),
        field: 'id'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      userLevel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_level'
      },
      avatar : {
        type : DataTypes.STRING,
        allowNull : true,
        field : 'avatar'
      },
      notificationPreference : {
        type : DataTypes.INTEGER,
        allowNull : true,
        field : 'notification_preference'
      },
      point : {
        type : DataTypes.INTEGER,
        allowNull : true,
        field : 'point'
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

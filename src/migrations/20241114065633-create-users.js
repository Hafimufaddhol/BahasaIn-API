'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('(UUID())')
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_pict:{
        allowNull : true,
        type: Sequelize.STRING
      },
      interest:{
        allowNull : true,
        type : Sequelize.JSON
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('user_progresses', 'user_progresses_ibfk_1');
    // await queryInterface.removeConstraint('user_achievements', 'user_achievements_ibfk_1');
    await queryInterface.dropTable('users');
  }
};

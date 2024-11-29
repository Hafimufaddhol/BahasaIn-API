'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notification_preferences', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      notification_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      last_notif_sent: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fcm_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notification_preferences');
  }
};

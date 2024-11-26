'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_achievements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Nama tabel Users
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      achievement_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'achievements',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      progress : {
        type : Sequelize.INTEGER
      },
      achieved_at: {
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_achievements');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_progresses', {
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
          model: 'Users', // Nama tabel Users
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Modules',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Levels',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      last_accessed: {
        type: Sequelize.DATE
      },
      score: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('user_progresses');
  }
};
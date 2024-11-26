'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'quizzes',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      option: {
        type: Sequelize.STRING
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
    await queryInterface.removeConstraint('quiz_options', 'quiz_options_ibfk_1');
    await queryInterface.dropTable('quizoptions');
    await queryInterface.dropTable('quizzes');
  }
};
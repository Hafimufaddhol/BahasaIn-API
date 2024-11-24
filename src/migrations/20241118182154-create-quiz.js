'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      type :{
        type : Sequelize.ENUM('essay','option'),
        allowNull : false,
      },
      question: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      explanation:{
        type: Sequelize.JSON
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
    // await queryInterface.removeConstraint('quizoptions', 'quiz_options_ibfk_1');
    await queryInterface.dropTable('quiz_options');
    await queryInterface.dropTable('quizzes');
  }
};
'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate dynamic quiz options
    const quizOptions = [];
    for (let i = 1; i <= 5; i++) { // Generate for 10 quizzes
      const numOptions = faker.number.int({ min: 2, max: 5 }); // Each quiz has 2-5 options
      for (let j = 1; j <= numOptions; j++) {
        quizOptions.push({
          quiz_id: i, // Assuming quiz IDs range from 1 to 10
          option: faker.lorem.sentence(), // Random option text
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    // Insert into QuizOption table
    await queryInterface.bulkInsert('quiz_options', quizOptions, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all data from QuizOption table
    await queryInterface.bulkDelete('quiz_options', null, {});
  },
};
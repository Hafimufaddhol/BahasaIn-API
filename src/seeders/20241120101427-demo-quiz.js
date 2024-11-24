'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const quizzes = [];

    for (let i = 0; i < 5; i++) {
      quizzes.push({
        level_id: i+1,
        type: faker.helpers.arrayElement(['essay', 'option']),
        question: faker.lorem.sentence(),
        answer: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('quizzes', quizzes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quizzes', null, {});
  }
};
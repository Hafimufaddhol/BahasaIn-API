'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const level = await queryInterface.sequelize.query(
      `SELECT id FROM levels;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const quizzes = [];

    for (let i = 0; i < 5; i++) {
      const randomLevel = level[Math.floor(Math.random() * level.length)];
      quizzes.push({
        level_id: randomLevel.id,
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
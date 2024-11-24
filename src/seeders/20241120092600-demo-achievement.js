'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const achievements = [];

    for (let i = 0; i < 5; i++) {
      achievements.push({
        name: faker.lorem.words(2),
        description: faker.lorem.words(8),
        max_progress: faker.number.int({ min: 50, max: 100 }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('Achievements', achievements, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('achievements', null, {});
  }
};

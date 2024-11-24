'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const streaks = [];

    for (let i = 0; i < 5; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      streaks.push({
        user_id: randomUser.id,
        streak: faker.number.int({ min: 1, max: 100 }),
        last_activity: faker.date.recent(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('streaks', streaks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('streaks', null, {});
  }
};

'use strict';
const { faker } = require('@faker-js/faker');
const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const achievements = await queryInterface.sequelize.query(
      `SELECT id FROM achievements;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const userAchievements = [];

    for (let i = 0; i < 5; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAchievements = achievements[Math.floor(Math.random() * achievements.length)];
      userAchievements.push({
        user_id: randomUser.id,
        achievement_id: randomAchievements.id,
        progress: faker.number.int({ min: 0, max: 100 }),
        achieved_at: faker.date.past(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('user_achievements', userAchievements, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_achievements', null, {});
  }
};

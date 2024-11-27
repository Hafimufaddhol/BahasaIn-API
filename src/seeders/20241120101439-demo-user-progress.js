'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
        const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const level = await queryInterface.sequelize.query(
      `SELECT id FROM levels;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const module = await queryInterface.sequelize.query(
      `SELECT id FROM modules;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const userProgresses = [];

    for (let i = 0; i < 5; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomLevel = level[Math.floor(Math.random() * level.length)];
      const randomModules = module[Math.floor(Math.random() * module.length)];
      userProgresses.push({
        user_id: randomUser.id,
        module_id: randomModules.id,
        level_id: randomLevel.id,
        completed: faker.datatype.boolean() ? 1 : 0,
        last_accessed: faker.date.recent(),
        score: faker.number.int({ min: 0, max: 100 }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('user_progresses', userProgresses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_Progresses', null, {});
  }
};

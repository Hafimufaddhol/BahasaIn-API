'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const module = await queryInterface.sequelize.query(
      `SELECT id FROM modules;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const levels = [];

    for (let i = 1; i <= 10; i++) {
      const randomModules = module[Math.floor(Math.random() * module.length)];
      levels.push({
        module_id: randomModules.id,
        title: faker.lorem.word(),
        order : i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('levels', levels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('levels', null, {});
  }
};
'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const levels = [];

    for (let i = 1; i <= 5; i++) {
      levels.push({
        module_id: i,
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
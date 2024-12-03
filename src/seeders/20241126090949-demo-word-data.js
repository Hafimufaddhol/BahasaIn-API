'use strict';
const { faker } = require('@faker-js/faker');  // Import faker

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const words = [];
    // Generate 100 fake words with categories
    for (let i = 0; i < 100; i++) {
      words.push({
        word: faker.word.noun(), // Generate a random word (can change to any word type)
// Randomly select a category
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await queryInterface.bulkInsert('words', words, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('words', null, {});
  }
};

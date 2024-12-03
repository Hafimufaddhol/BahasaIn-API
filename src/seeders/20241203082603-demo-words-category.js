'use strict';
const { faker } = require('@faker-js/faker');
const categories = ['Noun', 'Verb', 'Adjective', 'Pronoun', 'Adverb'];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const words = await queryInterface.sequelize.query(
      `SELECT id FROM words;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const wordsCategory = [];

    for (let i = 1; i <= 100; i++) {
      const randomWords = words[Math.floor(Math.random() * words.length)]; // Match the number of words generated above
      wordsCategory.push({
        word_id: randomWords.id,
        translate: faker.word.adjective(),
        category: categories[Math.floor(Math.random() * categories.length)], 
        description: faker.lorem.sentence(),
        example: faker.lorem.sentence(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('word_categories', wordsCategory);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('word_categories', null, {});
  }
};
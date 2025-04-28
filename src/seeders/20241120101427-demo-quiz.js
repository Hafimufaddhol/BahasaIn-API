'use strict';
const { faker } = require('@faker-js/faker');
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accessKey = 'jftTRvCK4RuLEo5Q3TJgJLHir8obdyaOZsOXSA44yf0';
    const level = await queryInterface.sequelize.query(
      `SELECT id FROM levels;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const quizzes = [];

    for (let i = 0; i < 5; i++) {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        if (response.status==200){
          const imageUrl = response.data.urls.full;
          const randomLevel = level[Math.floor(Math.random() * level.length)];
          quizzes.push({
            level_id: randomLevel.id,
            type: faker.helpers.arrayElement(['essay', 'option']),
            question: faker.lorem.sentence(),
            answer: faker.lorem.sentence(),
            image_url:imageUrl,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
      }
    }

    await queryInterface.bulkInsert('quizzes', quizzes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quizzes', null, {});
  }
};
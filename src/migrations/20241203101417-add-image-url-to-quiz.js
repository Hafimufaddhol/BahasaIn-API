'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quizzes', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true, // Sesuaikan dengan kebutuhan Anda
      defaultValue: null, // Optional, level default jika diperlukan
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('quizzes', 'image_url');
  },
};

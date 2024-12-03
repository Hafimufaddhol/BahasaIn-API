'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('words', 'category');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('words', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
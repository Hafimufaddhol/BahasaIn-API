'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('historicals', 'image_url');
    await queryInterface.removeColumn('recipes', 'image_url');
    await queryInterface.removeColumn('folklores', 'image_url');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('historicals', 'image_url', {
      type: Sequelize.STRING,
      allowNull: false, // Sesuaikan dengan kebutuhan Anda
      defaultValue: 0, // Optional, level default jika diperlukan
    });
    await queryInterface.addColumn('recipes', 'image_url', {
      type: Sequelize.STRING,
      allowNull: false, // Sesuaikan dengan kebutuhan Anda
      defaultValue: 0, // Optional, level default jika diperlukan
    });
    await queryInterface.addColumn('folklores', 'image_url', {
      type: Sequelize.STRING,
      allowNull: false, // Sesuaikan dengan kebutuhan Anda
      defaultValue: 0, // Optional, level default jika diperlukan
    });
  }
};

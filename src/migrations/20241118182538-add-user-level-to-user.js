'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'user_level', {
      type: Sequelize.INTEGER,
      allowNull: true, // Sesuaikan dengan kebutuhan Anda
      defaultValue: 1, // Optional, level default jika diperlukan
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'user_level');
  },
};

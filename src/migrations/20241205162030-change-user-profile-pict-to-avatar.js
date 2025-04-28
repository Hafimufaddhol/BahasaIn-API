'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename column `profile_pict` to `avatar`
    await queryInterface.renameColumn('users', 'profile_pict', 'avatar');

    // Change the column type from VARCHAR to INTEGER
    await queryInterface.changeColumn('users', 'avatar', {
      type: Sequelize.INTEGER, // Mengubah tipe data menjadi INTEGER
      allowNull: true, // Sesuaikan dengan kebutuhan Anda
      defaultValue: null, // Optional, defaultValue jika diperlukan
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert column name from `avatar` back to `profile_pict`
    await queryInterface.renameColumn('users', 'avatar', 'profile_pict');

    // Revert the column type back to VARCHAR (atau tipe data sebelumnya)
    await queryInterface.changeColumn('users', 'profile_pict', {
      type: Sequelize.STRING, // Kembalikan tipe data ke VARCHAR (atau tipe data sebelumnya)
      allowNull: true, // Sesuaikan dengan kebutuhan Anda
      defaultValue: null, // Optional, defaultValue jika diperlukan
    });
  },
};

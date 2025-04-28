'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Ganti nama kolom `interest` menjadi `notification_preference`
    await queryInterface.renameColumn('users', 'interest', 'notification_preference');

    // Jika tipe kolom perlu diubah, gunakan `changeColumn` setelah mengganti nama
    await queryInterface.changeColumn('users', 'notification_preference', {
      type: Sequelize.INTEGER, // Mengubah tipe ke INTEGER
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    // Kembalikan nama kolom `notification_preference` menjadi `interest`
    await queryInterface.renameColumn('users', 'notification_preference', 'interest');

    // Jika tipe kolom perlu dikembalikan, gunakan `changeColumn`
    await queryInterface.changeColumn('users', 'interest', {
      type: Sequelize.JSON, // Mengembalikan tipe ke JSON
      allowNull: true,
      defaultValue: null,
    });
  }
};

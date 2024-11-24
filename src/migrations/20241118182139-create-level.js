'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('levels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : 'Modules',
          key : 'id'
        },
        onDelete : 'CASCADE'
      },
      title: {
        type: Sequelize.STRING
      },
      order : {
        allowNull : true,
        type :Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('levels', {
      fields: ['module_id','order'], // Kombinasi kolom
      type: 'unique',
      name: 'unique_module_order', // Nama constraint (opsional)
  });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('userprogresses', 'userprogresses_ibfk_3');
    await queryInterface.dropTable('levels');
  }
};
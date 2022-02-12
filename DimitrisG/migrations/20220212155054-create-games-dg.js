'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GamesDGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PlayersDGs',
          key: 'id'
        }
      },
      player_2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PlayersDGs',
          key: 'id'
        }
      },
      Game: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GamesDGs');
  }
};
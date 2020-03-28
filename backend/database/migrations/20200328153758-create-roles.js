'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createSchema('users_dir', { transaction: t }),
        queryInterface.createTable('roles', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          level: {
            type: Sequelize.INTEGER
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }, {
          schema: 'users_dir',
          transaction: t
        })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: 'roles',
      schema: 'users_dir'
    });
  }
};
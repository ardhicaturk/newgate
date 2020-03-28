'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createSchema('users_dir', { transaction:t }),
        queryInterface.createTable('users_directories', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          uuid: {
            type: Sequelize.UUID
          },
          firstName: {
            type: Sequelize.STRING
          },
          lastName: {
            type: Sequelize.STRING
          },
          verfied: {
            type: Sequelize.BOOLEAN
          },
          email: {
            type: Sequelize.STRING
          },
          lastLogin: {
            type: Sequelize.DATE
          },
          image: {
            type: Sequelize.STRING
          },
          roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'roles',
              key: 'id'
            }
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: 'users_directories',
      schema: 'users_dir'
    });
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createSchema('auth', { transaction: t }),
        queryInterface.createTable('users_auth_modes', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          usersId: {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: 'users_directories',
                schema: 'users_dir',
              },
              key: 'id'
            }
          },
          authModeId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'auth_modes',
              key: 'id'
            }
          },
          authId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'auths',
              key: 'id'
            }
          },
          lastLogin: {
            type: Sequelize.DATE
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
          schema: 'auth',
          transaction: t
        })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: 'users_auth_modes',
      schema: 'auth'
    });
  }
};
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
                schema: 'users_dir',
                tableName: 'users_directories'
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
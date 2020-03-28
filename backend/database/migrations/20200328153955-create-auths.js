'use strict';

const cryptoRandomString = require('crypto-random-string');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createSchema('auth', { transaction: t }),
        queryInterface.createTable('auths', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          entity: {
            type: Sequelize.STRING
          },
          resetToken: {
            type: Sequelize.STRING,
            defaultValue: cryptoRandomString({length: 25})
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable({
      tableName: 'auths',
      schema: 'auth'
    });
  }
};
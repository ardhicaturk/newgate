'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert({
     schema: 'auth',
     tableName: 'auths'
   }, [
     {
      entity: bcrypt.hashSync('testing', 10),
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete({
    schema: 'auth',
    tableName: 'auths'
  }, null, {});
  }
};

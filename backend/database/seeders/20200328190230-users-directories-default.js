'use strict';
const {fromString} = require('uuidv4')
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
    schema: 'users_dir',
    tableName: 'users_directories'
  }, [
    {
      uuid: fromString(new Date().toDateString()),
      firstName: 'Foo',
      lastName: 'Bar',
      email: 'tester@example.com',
      roleId: 4,
      image: 'google.com',
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
    schema: 'users_dir',
    tableName: 'users_directories'
  }, null, {});
  }
};

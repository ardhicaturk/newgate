'use strict';

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
      tableName: 'roles'
    }, [
      {
        name: 'admin',
        level: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'maintener',
        level: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'developer',
        level: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'viewer',
        level: 3,
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
   return queryInterface.bulkDelete('users_dir.roles', null, {})
  }
};

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
     schema: 'auth',
     tableName: 'users_auth_modes'
   }, [
     {
       usersId: 1,
       authModeId: 1,
       authId: 1,
       lastLogin: new Date(),
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
    tableName: 'users_auth_modes'
  }, null, {});
  }
};

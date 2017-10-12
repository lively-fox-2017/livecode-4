'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Suppliers', [
     { name: 'PT.Ahay dah',kota:'Jakarta', createdAt:new Date(), updatedAt:new Date()},
     { name: 'PT.Boleh JUga',kota:'Semarang', createdAt:new Date(), updatedAt:new Date()},
     { name: 'PT.Berkah Jaya',kota:'Medan', createdAt:new Date(), updatedAt:new Date()},
    
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Suppliers', null, {});
  }
};

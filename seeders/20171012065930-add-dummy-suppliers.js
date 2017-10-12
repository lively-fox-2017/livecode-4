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
    return queryInterface.bulkInsert('Suppliers', [{
        name: 'PT Angin Ribut',
        kota: 'Jakarta Barat'
      },
      {
        name: 'PT Debu-debu Intan',
        kota: 'Semarang'
      },
      {
        name: 'PT Berdikarya',
        kota: 'Ambon'
      }]);
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

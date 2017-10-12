'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [{
      name: "PT. Angin Ribut",
      kota: "Jakarta",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "PT. Debu-Debu Intan",
      kota: "Semarang",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "PT. Berdikarya",
      kota: "Ambon",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suppliers', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

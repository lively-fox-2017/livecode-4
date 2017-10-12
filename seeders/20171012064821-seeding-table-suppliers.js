'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Suppliers', [{
      name: 'PT Gojek',
      kota: 'Jakarta',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT Uber',
      kota: 'Medan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'PT Grab',
      kota: 'Bandung',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

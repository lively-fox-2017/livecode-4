'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Items', ['codeitem'], {
      type: 'unique',
      name: 'unique_constraint_codeitem_items'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Items', 'codeitem');
  }
};

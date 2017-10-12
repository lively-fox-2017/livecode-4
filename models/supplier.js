'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Supplier;
};
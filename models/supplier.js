'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    createdAt: {
      type: DataTypes.date,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.date,
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
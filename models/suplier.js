'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suplier = sequelize.define('Suplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Suplier;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });

  Supplier.associate = function(models){
    Supplier.hasMany(models.Item, {foreignKey: 'supplierId'})
  }

  return Supplier;
};

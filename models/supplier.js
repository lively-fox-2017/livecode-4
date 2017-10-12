'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  Supplier.associate = function(models) {
    Supplier.hasMany(models.Item, {foreignKey: 'SupplierId'})
  }
  return Supplier;
};

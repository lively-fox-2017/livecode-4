'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });

  Supplier.associate = function(models){
    Supplier.hasMany(models.Item, {foreignKey: 'supplierId'})
    Supplier.hasMany(models.SupplierItem, {foreignKey: 'SupplierId'})
    // Supplier.belongsToMany(models.Item, {through: 'SupplierItem', foreignKey: 'SupplierId'})
  }

  return Supplier;
};

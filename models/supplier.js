'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });
  Supplier.associate = (model) => {
    Supplier.hasMany(model.SupplierItem, {foreignKey:'SupplierId'})
    Supplier.belongsToMany(model.Item, {through:'SupplierItem'})
  }
  return Supplier;
};
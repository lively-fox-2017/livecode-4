'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  SupplierItem.associate = function(models) {
    SupplierItem.belongsTo(models.Supplier)
    SupplierItem.belongsTo(models.Item)
  }
  return SupplierItem;
};

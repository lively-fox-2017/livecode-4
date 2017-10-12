'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  SupplierItem.associate = (model) => {
    SupplierItem.belongsTo(model.Supplier)
    SupplierItem.belongsTo(model.Item)
  }
  return SupplierItem;
};
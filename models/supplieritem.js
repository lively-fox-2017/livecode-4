'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    price: DataTypes.STRING,
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  })
  SupplierItem.associate = function(models){
    SupplierItem.belongsTo(models.Item)
    SupplierItem.belongsTo(models.Supplier)
  }
  return SupplierItem;
};

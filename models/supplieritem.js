'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  })

  SupplierItem.associate = model =>{
    SupplierItem.belongsTo(model.Suplier, {foreignKey : 'SupplierId'})
    SupplierItem.belongsTo(model.Item, {foreignKey : 'ItemId'})
  }

  return SupplierItem;
};
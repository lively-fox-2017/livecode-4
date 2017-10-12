'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    }
  })
  SupplierItem.associate = model => {
    SupplierItem.belongsTo(model.Supplier);
    SupplierItem.belongsTo(model.Item);


  }

  return SupplierItem;
};


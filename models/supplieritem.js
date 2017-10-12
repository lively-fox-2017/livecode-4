'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    supplierId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Supplier",
        key: "id"
      }
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Item",
        key: "id"
      }
    },
    price: DataTypes.INTEGER
  });

  SupplierItem.associate = model =>{
    SupplierItem.belongsTo(model.Supplier, {foreignKey: "supplierId"})
    SupplierItem.belongsTo(model.Item, {foreignKey: "itemId"})
  }
  return SupplierItem;
};

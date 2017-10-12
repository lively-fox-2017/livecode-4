'use strict';
const formatuang = require('../helpers/formatUang');
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });
  SupplierItem.associate = function(models) {
    SupplierItem.belongsTo(models.Item)
    SupplierItem.belongsTo(models.Supplier)
  };
  SupplierItem.formatUang = function() {
    return formatuang(this.price);
  }
  return SupplierItem;
};

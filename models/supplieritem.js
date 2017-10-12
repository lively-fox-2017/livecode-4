'use strict';
const formatUang = require('../helpers/formatUang');
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  SupplierItem.prototype.getPrice = function () {
    return formatUang(this.price);
  }

  return SupplierItem;
};

'use strict';

const helpers = require('../helpers/suppliers/curFormat')

module.exports = function(sequelize, DataTypes) {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  SupplierItem.associate = function(models){
    SupplierItem.belongsTo(models.Supplier, {foreignKey: 'SupplierId'})
    // SupplierItem.belongsTo(models.Item, {foreignKey: 'ItemId'})
  }

  SupplierItem.prototype.curFormat = function(){
    return helpers(this.price)
  }

  return SupplierItem;
};

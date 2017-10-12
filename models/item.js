'use strict';

const helpers = require('../helpers/items/codeItem')

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Code Item already used!'
      }
    },
    supplierId: DataTypes.INTEGER
  });

  Item.associate = function(models){
    Item.belongsTo(models.Supplier, {foreignKey: 'supplierId'})
    Item.hasMany(models.SupplierItem, {foreignKey: 'ItemId'})
    // Item.belongsToMany(models.Supplier, {through: 'SupplierItem', foreignKey: 'ItemId'})
  }

  Item.prototype.upper = function(code){
    return code.toUpperCase()
  }

  return Item;
};

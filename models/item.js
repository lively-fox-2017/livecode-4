'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  });
  Item.associate = (model) => {
    Item.hasMany(model.SupplierItem,{foreignKey:'ItemId'})
    Item.belongsToMany(model.Supplier,{through:'SupplierItem'})
  }
  return Item;
};
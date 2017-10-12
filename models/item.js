'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  })

  Item.associate = model =>{
    Item.hasMany(model.SupplierItem, {foreignKey : 'ItemId'})
    Item.belongsToMany(model.Suplier, {through : 'SupplierItem', foreignKey : 'ItemId'})
  }
  return Item;
};
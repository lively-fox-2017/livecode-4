'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  Item.associate = function(models){
    Item.belongsTo(models.Supplier)
  }
  return Item;
};

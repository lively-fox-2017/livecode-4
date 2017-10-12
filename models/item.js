'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:DataTypes.STRING
/*
    , {
      type:DataTypes.STRING,
      validate:{
        is: /(HP|SW|LP)\d{4}/,
        len: { 
           args: [2,7],
           msg: "The password length should be between 7 and 42 characters."
        }
      }
    }
*/
  });
  Item.associate = (model) => {
    Item.hasMany(model.SupplierItem,{foreignKey:'ItemId'})
    Item.belongsToMany(model.Supplier,{through:'SupplierItem'})
  }
  return Item;
};
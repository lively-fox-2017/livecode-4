'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });

  Supplier.associate =  model =>{
    Supplier.belongsToMany(model.Item, {through: "SupplierItem", foreignKey: "supplierId"})
    Supplier.hasMany(model.SupplierItem, {foreignKey: "supplierId"})
  }
  return Supplier;
};

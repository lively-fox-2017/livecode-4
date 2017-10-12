'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suplier = sequelize.define('Suplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  })

  Suplier.associate = model =>{
    Suplier.hasMany(model.SupplierItem, {foreignKey : 'SupplierId'})
    Suplier.belongsToMany(model.Item, {through : 'SupplierItem', foreignKey : 'SupplierId'})
  }
  return Suplier;
};
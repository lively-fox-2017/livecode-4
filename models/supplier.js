'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    }
  })
  Supplier.associate = model => {
    Supplier.belongsToMany(model.Item, { through: 'SupplierItem' });
    Supplier.hasMany(model.SupplierItem);


  }
  return Supplier;
};
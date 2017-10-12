'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Supplier.associate = function (models) {
    Supplier.belongsToMany(models.Item, { through: 'SupplierItem' })
    Supplier.hasMany(models.SupplierItem)
  }
  return Supplier;
};
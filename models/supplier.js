'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  Supplier.associate = function (models) {
    // Supplier.hasMany(models.SupplierItem)
    Supplier.belongsToMany(models.Item, { through: models.SupplierItem })
  };
  return Supplier;
};

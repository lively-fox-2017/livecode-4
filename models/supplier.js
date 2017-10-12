'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Supplier.associate = models => {
    // Supplier.belongsToMany(models.Item, {through: 'SupplierItem'})
    // Supplier.hasMany(models.Item)
  }

  return Supplier;
};
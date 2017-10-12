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
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item, {
      through: 'Supplieritem',
      foreignKey: 'supplierId',
      otherKey: 'itemId',
    });
    Supplier.hasMany(models.Supplieritem, {
      foreignKey: 'supplierId',
      sourceKey: 'id',
    })
  }
  return Supplier;
};

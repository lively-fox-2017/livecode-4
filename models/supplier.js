'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name harus diisi'
        }
      }
    },
    kota: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Kota harus diisi'
        }
      }
    }
  });

  Supplier.associate = function(models) {

    Supplier.hasMany(models.SupplierItem);
    Supplier.belongsToMany(models.Item, { through: 'SupplierItem' });

  }

  return Supplier;
};

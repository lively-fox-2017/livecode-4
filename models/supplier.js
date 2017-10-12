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

  Supplier.hook('beforeDestroy', (supplier, options) => {

    const Model = require('./index');
    Model.SupplierItem.destroy({
      where: { SupplierId: supplier.id }
    }).then(() => {
      return true;
    });

  });

  return Supplier;
};

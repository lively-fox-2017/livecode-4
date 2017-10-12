'use strict';
const formatUang = require('../helpers/formatUang');
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Supplier harus ada'
        }
      }
    },
    ItemId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Item harus ada'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price harus diisi'
        },
        isInt: {
          msg: 'Price harus berupa angka'
        }
      }
    }
  });

  SupplierItem.prototype.getPrice = function () {
    return formatUang(this.price);
  }

  SupplierItem.associate = function(models) {

    SupplierItem.belongsTo(models.Supplier);
    SupplierItem.belongsTo(models.Item);

  }

  return SupplierItem;
};

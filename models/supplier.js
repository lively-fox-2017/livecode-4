'use strict';
const model = require('../models')
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item, {through: 'SupplierItem'})
    Supplier.hasMany(models.SupplierItem);
  };
  Supplier.afterBulkDestroy((user, options)=>{
    var Othermodel = model;
    model.SupplierItem.destroy({
      where:{
        SupplierId: user.id
      }
    }).then((deleted)=>{
      console.log(deleted);
    }).catch((err)=>{
      console.log(err);
    })
  })
  return Supplier;
};

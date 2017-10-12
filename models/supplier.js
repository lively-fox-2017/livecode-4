'use strict';
const Models = require('../models');
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

  Supplier.associate = function (models){
    Supplier.belongsToMany(models.Item, {through:models.SupplierItem})
  }

  Supplier.afterDestroy((supplier, option)=>{
    console.log( Models.SupplierItem);
    return Models.SupplierItem.destroy({where:{SupplierId:supplier.id}})
  })
  return Supplier;
};

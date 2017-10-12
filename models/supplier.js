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
  Supplier.associate= model =>{
    Supplier.belongsToMany(model.Item, { through: 'SupplierItem' });
    Supplier.hasMany(model.SupplierItem);
  }
  return Supplier;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        
        // associations can be defined here
      }
    }
  });

  SupplierItem.associate = function (models) {
    SupplierItem.belongsTo(models.Item)
    SupplierItem.belongsTo(models.Suppliers)
  };
  return SupplierItem;

};
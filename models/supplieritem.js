'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplieritem = sequelize.define('Supplieritem', {
    supplierId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Supplieritem.associate = function(models) {
    Supplieritem.belongsTo(models.Supplier, {
      foreignKey: 'supplierId',
      targetKey: 'id',
    })
  }
  return Supplieritem;
};

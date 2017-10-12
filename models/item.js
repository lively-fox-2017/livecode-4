'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Item.associate = (model) => {
    Item.belongsToMany(model.Supplier, {through: 'SupplierItem'})
    Item.hasMany(model.SupplierItem)
  }
  return Item;
};

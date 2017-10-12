'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Code Item harus Unik'
      },
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Item.associate = function (models) {
    Item.hasMany(models.SupplierItem)
    Item.belongsToMany(models.Supplier, { through: models.SupplierItem })
  };
  return Item;
};

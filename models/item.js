'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: /^[LP|HP|SW]{2}\d{4}$/i
      }
    },
    SupplierId: DataTypes.INTEGER
  });
  Item.associate = function(models) {
    Item.belongsTo(models.Supplier);
  };
  return Item;
};

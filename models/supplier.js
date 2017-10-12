'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    Supplier.associate = function (models) {
      Supplier.hasMany(models.Item);
};
  });
  return Supplier;
};

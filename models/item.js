'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/g,
          message: 'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'
      }
    }
  }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Item.prototype.product = function () {
    return `${this.brand} ${this.name}`
  }
  Item.associate = function (models) {
    Item.belongsToMany(models.Supplier, { through: 'SupplierItem' })
    Item.hasMany(models.SupplierItem)
  }
  return Item;
};
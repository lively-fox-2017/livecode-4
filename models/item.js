'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        isFormat: function(value, next) {
          var rx = /(HP|SW|LP)\d{4}/;
          if (rx.test(value)) {
            next();
          } else {
            next('Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka');
          }
        },
        isUnique: function(value, next) {
          Item.find({
            where: {
              codeitem: value,
              id: {
                [sequelize.Op.not]: this.id
              }
            }
          }).done((data) => {
            if (data) {
              next('Code Item harus Unik');
            } else {
              next()
            }
          })
        }
      }
    }
  });
  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier, {through: 'SupplierItem'})
    Item.hasMany(models.SupplierItem);
  };
  return Item;
};

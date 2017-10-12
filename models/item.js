'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        codeFormat: function(value, next) {
          if (/(HP|SW|LP)\d{4}/.test(value)) {
            return next()
          } else {
            return next("Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka");
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
            })
            .then(items => {
              if (items)
                return next('Code Item harus Unik');
              else
                return next();
            })
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
  return Item;
};

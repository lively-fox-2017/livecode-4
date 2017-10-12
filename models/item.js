'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        }
        isUnique: function(value, next) {
          const options = {where: {codeitem: value}}
          Item.findOne(options)
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
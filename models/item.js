'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name harus diisi'
        }
      }
    },
    brand: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Brand harus diisi'
        }
      }
    },
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Code Item harus diisi'
        },
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        }
      },
      unique: {
        args: true,
        msg: 'Code Item harus Unik'
      }
    }
  });
  return Item;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate: {
        is: /(HP|SW|LP)\d{4}/, // Berformat yang benar, [2huruf (HP|SW|LP)][4angka] contoh: ‘HP1234’
        msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
      },
      unique: {
        msg: 'Code Item harus Unik'
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

// {unique: true, fields: ['poem']},
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:
    // DataTypes.STRING
     {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [[
                    // moible number of china
                    /(HP|SW|LP)\d{4}/
                    // telphone number of china
                    ]],
                msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka"
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

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
        type:DataTypes.STRING,
        unique: true,
        validate:{
          is: {
            args: /(HP|SW|LP)\d{4}/,
            msg :'hurufnya'
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

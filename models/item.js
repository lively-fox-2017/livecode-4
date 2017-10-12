'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /(HP|SW|LP)\d{4}/,
        msg : "‘Code Item harus Unik"
      }
    },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: new Date()
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Item;
};
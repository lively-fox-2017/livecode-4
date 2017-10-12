'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      type: DataTypes.date,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.date,
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
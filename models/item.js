'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeItem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        }
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

  Item.associate = models => {
    // Item.belongsToMany(models.Supplier, {through: 'SupplierItem'})
    // Item.hasMany(models.Supplier)
  }

  return Item;
};

// {unique: true, fields: ['poem']},
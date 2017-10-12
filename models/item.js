'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            unique: {
                args: true,
                message: 'Code Item harus Unik',
            },
            validate: {
                len: {
                    args: /(HP|SW|LP)\d{4}/,
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

    // Item.associate = function(models){
    //   Item.belongsToMany(models.Supplier, { through: 'SupplierItem' })
    // }



  return Item;
};

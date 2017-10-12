'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        message: 'Pesan Error: ‘Code Item harus Unik’',
        // fields: [sequelize.fn('lower', sequelize.col('codeitem'))]
      },
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'
        }
      }
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    SupplierId: DataTypes.INTEGER
  })
  Item.associate = function(models) {
    Item.belongsTo(models.Supplier, {foreignKey:"SupplierId"})
  }
  return Item;
};

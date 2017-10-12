'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING,
    // codeitem: {
    //     type: DataTypes.STRING,
    //     validate: {
    //         isIn: {
    //             args: [/(HP|SW|LP)\d{4}/],
    //             msg: "Code Item harus Unik!"
    //         }
    //     }
    // },
    createdAt: new Date(),
    updatedAt: new Date(),
    SupplierId: DataTypes.INTEGER
  })
  Item.associate = function(models){
    Item.belongsTo(models.Supplier)
    Item.hasMany(models.SupplierItem)
    // Item.belongsToMany(models.Supplier,{through: 'SupplierItem'})
  }
  return Item;
};

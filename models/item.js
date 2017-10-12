'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
       
      }
    }
  });
  Item.beforeCreate((models) => {
    var re = /(HP|SW|LP)\d{4}/;
    // console.log(re.test(models.codeitem), 'HAYOOOOO')
    if(re.test(models.codeitem) !== true) {
      return false
    }
    console.log(models.codeitem)
  })
  Item.associate = function (models) {
    Item.hasMany(models.Suppliers)
    Item.belongsToMany(models.Suppliers,{through: 'SupplierItem'})
  };
  
  return Item;
};
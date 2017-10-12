'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type:DataTypes.STRING,
      validate:{
        isFormatRight(value){
          let test = new RegExp(/(HP|SW|LP)\d{4}/).test(value);
          let code = ['HP','SW','LP']
          if(!test){
            throw new Error("Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka")
          }
        },
        isUnique(value){
          // Item.findOne({where:{codeitem}}).then((item)=>{
          //   if(item.codeitem){}
          //   else{throw new Error('Code sudah terdaftar')}
          // })
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

  Item.associate = function (models) {
    Item.belongsToMany(models.Supplier, {through:models.SupplierItem})
  };

  return Item;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: "Code Item harus diawali dengan HP / SW / LP dan diikuti dengan 4 digit angka"
        },
        isUnique: function(value, next) {
                    console.log(this.id);
                    Item.find({
                        where: {
                          codeitem: value,
                          id: {
                            [sequelize.Op.not]: this.id
                          }
                        }
                    }).then(function(error) {
                        if (error) {
                          return next('Code Item harus Unik');
                        } else{
                          return next();
                        }
                    })
                  }
      }
    }
  });

  Item.associate = model =>{
    Item.belongsToMany(model.Supplier, {through: "SupplierItem", foreignKey: "itemId"})
    Item.hasMany(model.SupplierItem, {foreignKey: "itemId"})
  }

  return Item;
};

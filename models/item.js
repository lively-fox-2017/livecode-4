'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: ['(HP|SW|LP)\d{4}'],
          msg: 'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'
        },
        isUnique: function(value, next) {
          const options = {
            where: {
              codeitem: value, 
              id: {
                [sequelize.Op.not]: this.id
              }
            }
          }
          Item.findOne(options)
          .then(item => {
            if (item) {
              next('Code Item harus Unik');
            } else {
              next();
            }
          })
          .catch(err => {
            next(err.message);
          });
        }
      }
    }
  });

  Item.associate = function(models) {
    Item.belongsToMany(models.Supplier, {through: models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  }

  return Item;
};
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
          msg: "Wrong Input For Code Item"
        },
        isUnique: function(value, next) {
                    Item.find({
                        where: {
                          codeitem: value,
                          id: {
                            [sequelize.Op.not]: this.id
                          }
                        }
                    }).then(function(error) {
                        if (error) {
                          return next('Code Item already in use!');
                        } else{
                          return next();
                        }
                    })
                  }
      }
    }
  });
  return Item;
};

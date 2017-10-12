const express = require('express');
const router = express.Router();
const model = require('../models')
const sequelize = require('sequelize');
const formatuang = require('../helpers/formatUang');

router.get('/', function(req, res){
  res.render('search');
})

router.post('/', function(req, res){
  if(req.body.min == ""){
    req.body.min = 0;
  }
  if(req.body.max == ""){
    req.body.max = 999999999999999
  }
  req.body.name = req.body.name.toLowerCase();
  console.log(req.body);
  model.SupplierItem.findAll({
    where:{
      price:{
        [sequelize.Op.between]:[parseInt(req.body.min),parseInt(req.body.max)]
      }
    },
    include:[
      {model: model.Item, where:{
        'name':{
          [sequelize.Op.like]:'%'+req.body.name+'%',
        }
      }}
      , {model:model.Supplier}
    ]
  }).then((data)=>{
    data.forEach((dat)=>{
      dat['harga'] = formatuang(dat.price);
    })
    res.render('search',{data:data});
  })
  // res.render('search', {data:data})
})

module.exports = router;

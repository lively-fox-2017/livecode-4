const express = require('express')
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res) {
  models.SupplierItem.findAll({
    include:[{
      model: models.Supplier
    },{
      model: models.Item
    }]
  })
  .then(rows=>{
    // res.send(rows)
    res.render('search',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/', function (req, res) {
  // console.log(req.body.name);
  models.SupplierItem.findAll({
    where:{
      price:req.body.min_price,
    },
    include:[{
      model: models.Supplier
    },{
      model: models.Item
      // where:{
      //   name:req.body.name,
      // }
    }
    // ,where:{
    //   name:req.body.name,
    // },
    ]
  })
  .then((rows)=>{
    res.render('search',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})

module.exports = router;

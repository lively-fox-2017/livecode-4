const express=require('express');
const router= express.Router()
const model= require ('../models')

router.get('/',(req,res)=>{
  model.Supplier.findAll()
  // .then(dataSupplier=>{
    // res.send('masuk')
    res.render('index')
  })
// })
module.exports = router;

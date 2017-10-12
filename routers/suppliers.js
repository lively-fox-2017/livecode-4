const express = require('express')
const router = express.Router()
const model = require('../models')




router.get('/',function(req, res){
  //res.send('hello')
  model.Supplier.findAll()
  .then(dataSuppliers=>{
    res.render('suppliers', {dataSuppliers:dataSuppliers})
  })
})

router.get('/add', function(req, res){
  //model.Supplier.create()
})



module.exports = router

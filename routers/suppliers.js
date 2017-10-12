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
  res.render('suppliers/addSuppliers')
})

router.post('/add', function(req, res){
  //res.send('woooooS')
  //console.log('hello');
  model.Supplier.create({
    name:req.body.name,
    kota:req.body.kota
  })
  .then(dataSuppliers=>{
    console.log(dataSuppliers);
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id',function(req,res){
  model.Supplier.findById({where:{id:req.params.id}})
  .then(dataSuppliers=>{
    console.log(dataSuppliers, 'foo');
    res.render('/suppliers/edit', {dataSuppliers:dataSuppliers})
  })
})




module.exports = router

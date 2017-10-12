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
  const id = req.params.id
  model.Supplier.findOne({where:{id:id}})
  .then(dataSuppliers=>{
    console.log(dataSuppliers, 'foo');
    res.render('/suppliers/edit', {dataSuppliers:dataSuppliers, id:id})
  })
})

router.get('/delete/:id',function(req,res){
  model.Supplier.destroy({ where: {
    id: req.params.id }
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
})

module.exports = router

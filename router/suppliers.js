const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/',function(req,res){
  Models.Supplier.findAll().then(function(dataSupplier){
    res.render('suppliers',{Supplier:dataSupplier})
  })
})

router.get('/add',function(req,res){
  res.render('addSuppliers')
})

router.post('/add',function(req,res){
  Models.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  }).then(function(){
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id',function(req,res){
  Models.Supplier.findAll({
    where:{
      id: req.params.id
    }
  }).then(function(dataSupplier){
    res.render('editSuppliers',{Supplier:dataSupplier})
  })
})

router.post('/edit/:id',function(req,res){
  Models.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  },{
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id',function(req,res){
  Models.Supplier.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/suppliers')
  })
})


module.exports = router

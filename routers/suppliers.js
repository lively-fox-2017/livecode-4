let express = require('express');
let router = express.Router();
let model = require('../models');

// ------------------ CRUD ----------- //

// CREATE
router.get('/add', function(req,res){
  model.Supplier.findAll().then(data_Suppliers =>{
    res.render('suppliers-add', {data_SuppliersToEjs:data_Suppliers})
  })
})

router.post('/add', function(req,res){
  model.Supplier.create({
    name : req.body.suppliers_name,
    kota : req.body.suppliers_kota
  }).then(data_Suppliers =>{
    res.redirect('../../suppliers')
  })
})

// READ
router.get('/', function(req,res){
  model.Supplier.findAll().then(data_Suppliers =>{
    res.render('suppliers', {data_SuppliersToEjs:data_Suppliers})
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  model.Supplier.findById(req.params.id).then(data_Suppliers =>{
    res.render('suppliers-edit', {data_SuppliersToEjs:data_Suppliers})
  })
})

router.post('/edit/:id', function(req,res){
  model.Supplier.update({
    name : req.body.suppliers_name,
    kota : req.body.suppliers_kota
  },{where:{id:req.params.id}}).then(data_Suppliers =>{
    res.redirect('../../suppliers')
  })
})

// DELETE
router.get('/delete/:id', function(req,res){
  model.Supplier.destroy({where:{id:req.params.id}}).then(data_Suppliers => {
    res.redirect('../../suppliers')
  })
})

module.exports = router

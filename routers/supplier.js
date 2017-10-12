const express = require('express');
const router = express.Router();
const model = require('../models')

router.get('/', function(req, res) {
  model.Supplier.findAll().then((data)=>{
    res.render('show_list_supplier', {dataSupplier:data});
  }).catch((err)=>{
    console.log(err);
  })
})

router.get('/add', function(req, res) {
  res.render('form_add_supplier');
})

router.post('/add', function(req, res){
  model.Supplier.create(req.body).then((inserted)=>{
    res.redirect('/suppliers?message=success');
  }).catch((err)=>{
    res.redirect('/suppliers?message='+err);
  })
})

router.get('/edit/:id', function(req, res){
  model.Supplier.findOne({
    where:{
      id:req.params.id
    }
  }).then((data)=>{
    res.render('form_edit_supplier', {dataSupplier:data});
  }).catch((err)=>{
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res){
  model.Supplier.update(req.body, {
    where: {
      id:req.params.id
    }
  }).then((updated)=>{
    res.redirect('/suppliers?message=success');
  }).catch((err)=>{
    res.redirect('/suppliers?message='+err);
  })
})

router.get('/delete/:id', function(req, res){
  model.Supplier.destroy({
    where:{
      id:req.params.id
    }
  }).then((deleted)=>{
    res.redirect('/suppliers?message=success');
  }).catch((err)=>{
    res.redirect('/suppliers?message='+err);
  })
})

module.exports = router;

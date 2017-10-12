const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res)=>{
  model.Supplier.findAll()
  .then(dataSuppliers=>{
    res.render('suppliers', {dataSuppliers})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('add_suppliers')
})

router.post('/add', (req, res)=>{
  model.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Supplier.findById(req.params.id)
  .then(dataSuppliers=>{
    // res.send(dataSuppliers)
    res.render('edit_suppliers', {dataSuppliers})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  },{
    where: {id:[[req.params.id]]}
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;

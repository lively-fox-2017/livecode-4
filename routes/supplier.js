const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res)=>{
  model.Supplier.findAll().then(dataSupplier=>{
    // res.send(suppliers);
    res.render('supplier', {suppliers:dataSupplier})
  })
})

router.get('/add', (req, res)=>{
  res.render('supplier-add')
})

router.post('/add', (req, res)=>{
  console.log(req.body);
  model.Supplier.create(req.body).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Supplier.findOne({where:req.params}).then(dataSupplier=>{
    // res.redirect('/suppliers')
    res.render('supplier-edit', {supplier:dataSupplier})
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Supplier.update(req.body, {where:req.params}).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Supplier.destroy({where:req.params}).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})
module.exports = router;

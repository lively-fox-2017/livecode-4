const express = require('express');
var router = express.Router();
const Models = require('../models');

router.get('/', (req, res)=>{
  Models.Supplier.findAll().then((suppliers)=>{
    let dataPassed = {};
    dataPassed.suppliers = suppliers
    res.render('suppliers/allSuppliers', dataPassed)
  })
})

router.get('/add', (req, res)=>{
  let dataPassed = {}
  res.render('suppliers/addSupplier', dataPassed)
})

router.post('/add', (req, res)=>{
  Models.Supplier.create({name:req.body.name, kota:req.body.kota}).then(()=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res)=>{
  Models.Supplier.findById(req.params.id).then((supplier)=>{
    let dataPassed = {supplier}
    res.render('suppliers/editSupplier', dataPassed)
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Supplier.findById(req.params.id).then((supplier)=>{
    supplier.name = req.body.name;
    supplier.kota = req.body.kota;
    supplier.save().then(()=>{
      res.redirect('/suppliers')
    })
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Supplier.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/suppliers')
  })
})

router.get('/:id/additem', (req, res)=>{
  let supplier= null;
  let supplierItems = [];
  Models.Supplier.findById(req.params.id).then((iSupplier)=>{
    supplier = iSupplier;
    return supplier.getItems()
  }).then((item)=>{
    supplierItems = item
    //res.send(item)
    return Models.Item.findAll()
  }).then((items)=>{
    items.filter((item) => {if(!(item in supplierItems)){return item}})
    //res.send(supplierItems)
    let dataPassed = {supplier, items}
    res.render('suppliers/addItem',dataPassed)
  }).catch((err) => {
    res.redirect('/');
  })

})

module.exports = router;

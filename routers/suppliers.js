let express = require('express');
let router = express.Router();
let model = require('../models');

router.get('/', (req, res) => {
  model.Supplier.findAll().then((dataSupplier) => {
    model.SupplierItem.findAll({include:[model.Item, model.Supplier]}).then((dataSuppItem) => {
      res.render('supplier', {dataSupplier: dataSupplier, dataSuppItem: dataSuppItem})
    })
  })
})

router.get('/add', (req, res) => {
  res.render('supplieradd')
})

router.post('/add', (req, res) => {
  model.Supplier.create({name: req.body.name, kota: req.body.kota}).then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id', (req, res) => {
  model.Supplier.destroy({where:{id: req.params.id}}).then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Supplier.findAll({where:{id: req.params.id}}).then((dataSupplier) => {
    res.render('supplieredit', {dataSupplier: dataSupplier})
  })
})

router.post('/edit/:id', (req, res)=> {
  model.Supplier.update({name: req.body.name, kota: req.body.kota},{where:{id: req.params.id}}).then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/:id/additem', (req, res) => {
  model.Supplier.findAll({where:{id: req.params.id}}).then((dataSupplier) => {
    model.Item.findAll().then((dataItem) => {
      res.render('supplieradditem', {dataSupplier: dataSupplier, dataItem: dataItem})
    })
  })
})

router.post('/:id/additem', (req, res) => {
  model.SupplierItem.create({SupplierId: req.params.id, ItemId: req.body.ItemId, price: req.body.price }).then(() => {
    res.redirect('/suppliers')
  })
})


module.exports = router

let express = require('express');
let router = express.Router();
let model = require('../models');

router.get('/', (req, res) => {
  model.Supplier.findAll().then((dataSupplier) => {
    res.render('supplier', {dataSupplier: dataSupplier})
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


module.exports = router

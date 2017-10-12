const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/', (req, res) => {
  Models.Supplier.findAll({
    include: [{
      model: Models.Item
    }]
  })
  .then(supp => {
    res.render('suppliers', {
      data: supp,
      title: 'Suppliers Page'
    })
    // res.send(supp)
  })
})

router.get('/add-item/:id', (req, res) => {
  Models.Supplier.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(sup => {
    Models.Item.findAll()
    .then(item => {
      res.render('addSupplierItem', {

      })
    })
  })
})

router.get('/add', (req, res) => {
  res.render('addSupplier', {
    title: 'Add Supplier'
  })
})

router.post('/add', (req, res) => {
  Models.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  })
  .then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res) => {
  Models.Supplier.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(sup => {
    res.render('editSupplier', {
      data: sup[0],
      title: 'Edit Supplier Page'
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Models.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id', (req, res) => {
  Models.Supplier.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/suppliers')
  })
})

module.exports = router

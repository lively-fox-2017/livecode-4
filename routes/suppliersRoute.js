const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res) => {
  model.Supplier.findAll()
    .then(suppliers => {
      res.render('show_list_suppliers', {
        title: 'List Suppliers',
        suppliers: suppliers
      });
    })
});

router.get('/add', (req, res) => {
  res.render('form_supplier', {
    title: 'Add Suppliers',
    aksi: '/suppliers/add',
    supplier: null,
  });
});

router.post('/add', (req, res) => {
  model.Supplier.create(req.body)
    .then(inserted => {
      res.redirect('/suppliers/');
    });
});

router.get('/edit/:id', (req, res) => {
  model.Supplier.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(supplier => {
      res.render('form_supplier', {
        title: 'Edit Suppliers',
        aksi: '/suppliers/edit/' + supplier.id,
        supplier: supplier,
      });
    });
});

router.post('/edit/:id', (req, res) => {
  model.Supplier.update({
      name: req.body.name,
      kota: req.body.kota,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(count => {
      res.redirect('/suppliers');
    })
});

router.get('/delete/:id', (req, res) => {
  model.Supplier.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/suppliers');
    })
});

module.exports = router;

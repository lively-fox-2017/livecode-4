const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res) => {
  model.Supplier.findAll({
      include: ['Supplieritems']
    })
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

router.get('/:id/additem', (req, res) => {
  Promise.all([
      model.Supplier.findOne({
        where: {
          id: req.params.id,
        },
        include: ['Supplieritems']
      }),
      model.Item.findAll()
    ])
    .then(values => {
      res.render('form_add_item_supplier', {
        title: 'Edit Suppliers',
        supplier: values[0],
        items: values[1]
      });
    })
});

router.post('/:id/additem', (req, res) => {
  model.Supplieritem.create({
      supplierId: req.params.id,
      itemId: req.body.item,
      price: req.body.price
    })
    .then(inserted => {
      res.redirect(`/suppliers/${req.params.id}/additem`);
    })
    .catch(reason => {
      console.log(reason);
    })
});

module.exports = router;

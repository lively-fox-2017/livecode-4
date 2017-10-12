const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res) => {
  Model.Supplier.all({
    include: [ Model.Item ],
    order: [['name', 'ASC']]
  }).then((suppliers) => {
    res.render('suppliers/index', {
      suppliers: suppliers
    });
  });
});

router.get('/add', (req, res) => {
  res.render('suppliers/add');
});

router.post('/add', (req, res) => {
  Model.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  }).then(() => {
    res.redirect('/suppliers');
  }).catch((err) => {
    res.render('suppliers/add', {
      errors: err.errors
    });
  });
});

router.get('/edit/:id', (req, res) => {
  Model.Supplier.findById(req.params.id).then((supplier) => {
    if (!supplier) { res.redirect('/suppliers') }
    else {
      res.render('suppliers/edit', {
        supplier: supplier
      });
    }
  });
});

router.post('/edit/:id', (req, res) => {
  Model.Supplier.findById(req.params.id).then((supplier) => {
    if (!supplier) { res.redirect('/suppliers') }
    else {
      Model.Supplier.update(
        {
          name: req.body.name,
          kota: req.body.kota
        },
        {
          where: { id: req.params.id }
        }
      ).then(() => {
        res.redirect('/suppliers');
      }).catch((err) => {
        res.render('suppliers/edit', {
          errors: err.errors,
          supplier: supplier
        });
      });
    }
  });
})

router.get('/delete/:id', (req, res) => {
  Model.Supplier.findById(req.params.id).then((supplier) => {
    if (!supplier) { res.redirect('/suppliers') }
    else {
      Model.Supplier.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('/suppliers');
      });
    }
  });
});

module.exports = router;

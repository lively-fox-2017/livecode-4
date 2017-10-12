const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res) => {
  Model.Item.all({
    order: [['name', 'ASC']],
    include: [ Model.Supplier ]
  }).then((items) => {
    res.render('items/index', {
      items: items
    });
  });
});

router.get('/add', (req, res) => {
  res.render('items/add');
});

router.post('/add', (req, res) => {
  Model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }).then(() => {
    res.redirect('/items');
  }).catch((err) => {
    res.render('items/add', {
      errors: err.errors
    });
  });
});

router.get('/edit/:id', (req, res) => {
  Model.Item.findById(req.params.id).then((item) => {
    if (!item) { res.redirect('/items') }
    else {
      res.render('items/edit', {
        item: item
      });
    }
  });
});

router.post('/edit/:id', (req, res) => {
  Model.Item.findById(req.params.id).then((item) => {
    if (!item) { res.redirect('/items') }
    else {
      Model.Item.update(
        {
          name: req.body.name,
          brand: req.body.brand,
          codeitem: req.body.codeitem
        },
        {
          where: { id: req.params.id }
        }
      ).then(() => {
        res.redirect('/items');
      }).catch((err) => {
        res.render('items/edit', {
          errors: err.errors,
          item: item
        });
      });
    }
  });
})

router.get('/delete/:id', (req, res) => {
  Model.Item.findById(req.params.id).then((item) => {
    if (!item) { res.redirect('/items') }
    else {
      Model.Item.destroy({
        where: { id: req.params.id },
        individualHooks: true
      }).then(() => {
        res.redirect('/items');
      });
    }
  });
});

module.exports = router;

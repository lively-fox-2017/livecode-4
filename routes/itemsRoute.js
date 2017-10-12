const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res) => {
  model.Item.findAll()
    .then(items => {
      res.render('show_list_items', {
        title: 'List Items',
        items: items
      });
    })
});

router.get('/add', (req, res) => {
  res.render('form_item', {
    title: 'Add Items',
    aksi: '/items/add',
    item: null,
  });
});

router.post('/add', (req, res) => {
  model.Item.create(req.body)
    .then(inserted => {
      res.redirect('/items/');
    });
});

router.get('/edit/:id', (req, res) => {
  model.Item.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(item => {
      res.render('form_item', {
        title: 'Edit Items',
        aksi: '/items/edit/' + item.id,
        item: item,
        err: req.query.err
      });
    });
});

router.post('/edit/:id', (req, res) => {
  model.Item.update({
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(count => {
      res.redirect('/items');
    })
    .catch(reason => {
      res.redirect('/items/edit/' + req.params.id + '?err=' + encodeURIComponent(reason.message));
    });
});

router.get('/delete/:id', (req, res) => {
  model.Item.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/items');
    })
});

module.exports = router;

const express = require('express');
const router = express.Router();
const model = require('../models')
const formatuang = require('../helpers/formatUang');

router.get('/', function(req, res) {
  // model.Item.findAll().then((data) => {
  //   res.render('show_list_item', {
  //     dataItem: data
  //   });
  // }).catch((err) => {
  //   console.log(err);
  // })
  model.Item.findAll().then((data) => {
    var arr_prom = [];
    data.forEach((item) => {
      arr_prom.push(item.getSuppliers());
    })
    Promise.all(arr_prom).then((results) => {
      results.forEach((result, index) => {
        var arrSupplier = [];
        if (result) {
          result.forEach((supplier) => {
            supplier.harga = formatuang(supplier.SupplierItem.price);
            arrSupplier.push(supplier);
          })
          data[index]['listsupplier'] = arrSupplier;
        }
      })
      res.render('show_list_item', {
        dataItem: data
      });
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

router.get('/add', function(req, res) {
  res.render('form_add_item', {
    message: (req.query.hasOwnProperty('message')) ? req.query.message : ""
  });
})

router.post('/add', function(req, res) {
  req.body.id = req.params.id;
  model.Item.create(req.body).then((inserted) => {
    res.redirect('/items?message=success');
  }).catch((err) => {
    res.redirect('/items/add?message=' + err.errors[0].message);
  })
})

router.get('/edit/:id', function(req, res) {
  model.Item.findOne({
    where: {
      id: req.params.id,
    }
  }).then((data) => {
    res.render('form_edit_item', {
      dataItem: data,
      message: (req.query.hasOwnProperty('message')) ? req.query.message : ""
    });
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res) {
  req.body.id = req.params.id
  model.Item.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((updated) => {
    res.redirect('/items?message=success');
  }).catch((err) => {
    console.log(err);
    res.redirect('/items/edit/' + req.params.id + '?message=' + err.errors[0].message);
  })
})

router.get('/delete/:id', function(req, res) {
  model.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleted) => {
    res.redirect('/items?message=success');
  }).catch((err) => {
    res.redirect('/items?message=' + err);
  })
})

module.exports = router;

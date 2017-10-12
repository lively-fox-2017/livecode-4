const express = require('express');
const router = express.Router();
const model = require('../models')
const sequelize = require('sequelize')
const formatuang = require('../helpers/formatUang');

router.get('/', function(req, res) {
  model.Supplier.findAll().then((data) => {
    var arr_prom = [];
    data.forEach((supplier) => {
      arr_prom.push(supplier.getItems());
    })
    Promise.all(arr_prom).then((results) => {
      results.forEach((result, index) => {
        var arrItem = [];
        if (result) {
          result.forEach((item) => {
            item.harga = formatuang(item.SupplierItem.price);
            arrItem.push(item);
          })
          data[index]['listitem'] = arrItem;
        }
      })
      res.render('show_list_supplier', {
        dataSupplier: data
      });
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
})

router.get('/add', function(req, res) {
  res.render('form_add_supplier');
})

router.post('/add', function(req, res) {
  model.Supplier.create(req.body).then((inserted) => {
    res.redirect('/suppliers?message=success');
  }).catch((err) => {
    res.redirect('/suppliers?message=' + err);
  })
})

router.get('/edit/:id', function(req, res) {
  model.Supplier.findOne({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.render('form_edit_supplier', {
      dataSupplier: data
    });
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req, res) {
  model.Supplier.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((updated) => {
    res.redirect('/suppliers?message=success');
  }).catch((err) => {
    res.redirect('/suppliers?message=' + err);
  })
})

router.get('/delete/:id', function(req, res) {
  model.Supplier.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleted) => {
    res.redirect('/suppliers?message=success');
  }).catch((err) => {
    res.redirect('/suppliers?message=' + err);
  })
})

router.get('/:id/additem', function(req, res) {
  model.Supplier.findOne({
    where: {
      id: req.params.id
    }
  }).then((supplier) => {
    model.SupplierItem.findAll({
      where:{
        SupplierId:req.params.id
      }
    }).then((data)=>{
      var notAvailableItem = data.map((item)=>{return item.ItemId});
      model.Item.findAll({
        where:{
          id:{
            [sequelize.Op.notIn]:notAvailableItem
          }
        }
      }).then((items)=>{
        res.render('form_assign_item', {
          dataSupplier: supplier,
          dataItem:items
        });
      })
    })
  }).catch((err) => {
    console.log(err);
  })
})

router.post('/:id/additem', function(req, res){
  model.SupplierItem.create({
    SupplierId:req.params.id,
    ItemId:req.body.ItemId,
    price:req.body.price
  }).then((inserted)=>{
    res.redirect('/suppliers?message=success');
  }).catch((err)=>{
    res.redirect('/suppliers?message='+err);
  })
})

module.exports = router;

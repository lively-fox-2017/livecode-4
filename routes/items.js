const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', function(req,res) {
  Model.Item.findAll({
    order: [['id','ASC']]
  })
  .then(dataItem => {
    let promise = dataItem.map((item) => {
      return new Promise((resolve,reject) => {
        item.getSupplier()
        .then(supplier => {
          if (supplier) {
            item.supplier_name = supplier.name
          }else{
            item.supplier_name = 'No Supplier Yet'
          }
          resolve(item)
        })
        .catch(err => {
          reject(err)
        })
      })
    })

    Promise.all(promise)
    .then(fixDataitem => {
      console.log(fixDataitem);
      // res.send(fixDataitem)
      res.render('items/items', {dataItem: fixDataitem})
    })

  })
})

router.post('/', function(req,res) {
  Model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  })
  .then(() => {
    res.redirect('/items')
  })
})

router.get('/delete/:id', function(req,res) {
  Model.Item.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/items')
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Item.findById(req.params.id)
  .then(dataItem => {
    res.render('items/edit', {dataItem:dataItem})
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  }, {
    where : {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/items')
  })
})



module.exports = router

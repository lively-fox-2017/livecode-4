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
          if (supplier == null) {
            item.supplier_name = 'No Supplier Yet'
          }else{
            item.supplier_name = supplier.name
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
      res.render('items/items', {dataItem: fixDataitem, dataError:null})
    })

  })
})

router.post('/', function(req,res) {
  Model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
    SupplierId: req.body.name
  })
  .then(() => {
    res.redirect('/items')
  })
  .catch(err => {
    // res.send(err.message)
    if (err) {
      if (err.message == 'Validation error: Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka') {
        Model.Item.findAll({
          order: [['id','ASC']]
        })
        .then(dataItem => {
          let promise = dataItem.map((item) => {
            return new Promise((resolve,reject) => {
              item.getSupplier()
              .then(supplier => {
                if (supplier == null) {
                  item.supplier_name = 'No Supplier Yet'
                }else{
                  item.supplier_name = supplier.name
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
            res.render('items/items', {dataItem: dataItem, dataError:'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'})
            // res.render('items/items', {dataItem: fixDataitem, dataError:null})
          })
        })
      } else if (err.message == 'Pesan Error: Code Item harus Unik') {
        res.redirect('/items', {dataError:'Pesan Error: Code Item harus Unik'})
      }
    }
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
    res.render('items/edit', {dataItem:dataItem, dataError:null})
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
    SupplierId: req.body.SupplierId
  }, {
    where : {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/items')
  })
  .catch(err => {
    // res.send(err)
    if (err) {
      if (err.message == 'Validation error: Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka') {
        Model.Item.findById(req.params.id)
        .then(dataItem => {
          res.render('items/edit', {dataItem:data, dataError:'Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka'})
        })
      } else if (err.message == 'Pesan Error: Code Item harus Unik') {
        res.redirect('/items/edit', {dataError:'Pesan Error: Code Item harus Unik'})
      }
    }
  })
})



module.exports = router

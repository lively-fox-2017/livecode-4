const express = require('express')
const router = express.Router()
const Model = require('../models')

// router.get('/', function(req,res) {
//   Model.Supplier.findAll()
//   .then(dataSupplier => {
//     res.render('suppliers/suppliers', {dataSupplier:dataSupplier})
//   })
// })

router.get('/', function(req,res ) {
  Model.Supplier.findAll()
  .then(dataSupplier => {
    let promise = dataSupplier.map((supplier) => {
      return new Promise((resolve,reject) => {
        supplier.getItems()
         .then(item => {
           if(item) {
             let newData = item.map(dataItem => {
               return dataItem.name
             })
            //  console.log(newData);
             supplier["item"] = newData
           } else {
             supplier["item"] = ['BELUM BELI HAPE']
           }
           resolve(supplier);
         })
         .catch(err => {
           reject(err)
         })
      })
    })
    Promise.all(promise)
     .then(fixData => {
       console.log(fixData);
        // res.send(fixData)
      res.render('suppliers/suppliers', {dataSupplier: fixData})
     })
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/', function(req,res) {
  Model.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  })
  .then(() => {
    // console.log(req.body.name + ' ETAAAAAAAAAAAAAAAAAAAAAAAA' + req.body.kota);
    res.redirect('/suppliers')
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', function(req,res) {
  Model.Supplier.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', function(req,res) {
  Model.Supplier.findById(req.params.id)
  .then(dataSupplier => {
    // res.send(dataSupplier)
    res.render('suppliers/edit', {dataSupplier:dataSupplier})
  })
})

router.post('/edit/:id', function(req,res) {
  Model.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  }, {
    where : {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/suppliers')
  })
  .catch(err => {
    res.send(err)
  })
})



module.exports = router

const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req,res)=>{
  // res.send('Supplier')
  model.Supplier.findAll()
  .then(dataSupplier=>{
    // res.render(dataSupplier, {dataSupplier:dataSupplier})
    res.send(dataSupplier)
  })
  .catch((err)=>{
    console.log(err);
  })
})

router.get('/add', (req,res)=>{
  res.send('get Supplier')
})

router.post('/add', (req,res)=>{
  res.send('Add Supplier')
})

router.get('/edit/:id', (req,res)=>{
  res.send('get edit Supplier')
})

router.post('/edit/:id', (req,res)=>{
  res.send('post edit Supplier')
})

router.post('/delete/:id', (req,res)=>{
  res.send('delete Supplier')
})




module.exports= router

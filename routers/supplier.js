var express = require('express')
var router = express.Router()
let model = require('../models')

router.get('/', (req,res)=>{
  model.Supplier.findAll()
    .then(dataSupplier=>{
        res.render('supplier',{dataSupplier:dataSupplier});
  })
})

router.get('/add', (req, res)=>{
  res.render('addSupplier')
})
router.post('/add', (req, res)=>{
  model.Supplier.create(
    {
      name: req.body.name,
      kota: req.body.kota
    }).then(()=>{
      res.redirect('/supplier');
    })
})

router.get('/edit/:id',(req, res)=>{
  model.Supplier.findById(req.params.id)
    .then(editSupplier=>{
      res.render('editSupplier', {editSupplier:editSupplier})
    })
})

router.post('/edit/:id', (req, res)=>{
  model.Supplier.update(
    {
      name: req.body.name,
      kota: req.body.kota
    },{
      where: {
        id: req.params.id
      }
    }).then(()=>{
      res.redirect('/supplier')
    })
})
router.get('/delete/:id', (req, res)=>{
  model.Supplier.destroy(
    {
      where:{
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/supplier')
    })
})

module.exports =  router;
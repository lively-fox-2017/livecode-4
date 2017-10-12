const express = require('express')
const router = express.Router()

const models = require('../models')

router.get('/',(req,res)=>{
  models.Supplier.findAll().then(dataSupplier=>{
    res.send(dataSupplier)
  })
})

router.get('/add',(req,res)=>{
  res.render('supplier_add')
})

router.post('/add', (req,res)=>{
  let condition={
    name:req.body.name,
    kota:req.body.kota
  }
  models.Supplier.create(condition).then(newSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id',(req,res)=>{
  models.Supplier.findById(req.params.id).then(dataSupplier=>{
    res.render('supplier_edit',{dataSupplier:dataSupplier})
  })
})

router.post('/edit/:id', (req,res)=>{
  let update={
      name:req.body.name,
      kota:req.body.kota
  }
  let condition={
    where:{id:req.params.id}
  }
  models.Supplier.update(update,condition).then(updateResult=>{
    res.redirect('/suppliers')

  })
})


router.get('/delete/:id',(req,res)=>{
  models.Supplier.findById(req.params.id).then(dataSupplier=>{
    res.render('supplier_delete',{dataSupplier:dataSupplier})
  })
})

router.post('/delete/:id', (req,res)=>{
  let condition={
    where:{id:req.params.id}
  }
  models.Supplier.destroy(condition).then(updateResult=>{
    res.redirect('/suppliers')

  })
})


module.exports = router

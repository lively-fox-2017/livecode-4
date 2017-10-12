const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res)=>{
  model.Supplier.findAll({
    include: [{
      model: model.Item
    }]
  }).then(dataSupplier=>{
    // console.log(dataSupplier[1].Items);
    // res.send(dataSupplier);
    res.render('supplier', {suppliers:dataSupplier})
  })
})

router.get('/add', (req, res)=>{
  res.render('supplier-add')
})

router.post('/add', (req, res)=>{
  console.log(req.body);
  model.Supplier.create(req.body).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Supplier.findOne({where:req.params}).then(dataSupplier=>{
    // res.redirect('/suppliers')
    res.render('supplier-edit', {supplier:dataSupplier})
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Supplier.update(req.body, {where:req.params}).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Supplier.destroy({where:req.params}).then(dataSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/:id/additem', (req, res)=>{
  Promise.all([
  model.Supplier.findOne({
    where: req.params,
    include: [{
      model: model.Item
    }]
  }),
  model.Item.findAll()
  ]).then(data=>{
    // res.send(data[0]);
    res.render('assign-item', {supplier:data[0], items:data[1]})
  })
})

router.post('/:id/additem', (req, res)=>{
  req.body.SupplierId = req.params.id
  console.log(req.body);
  model.SupplierItem.create(req.body).then(dataSuplier=>{
    res.redirect('/suppliers')
  })
})

module.exports = router;

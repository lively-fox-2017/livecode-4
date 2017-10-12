var express = require('express')
var router = express.Router()
let model = require('../models')

router.get('/', (req,res)=>{
  model.Supplier.findAll(
    {
      include: ['Items']
    }
  )
    .then(dataSupplier=>{
      // res.send(dataSupplier[0])
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

router.get('/:id/additem',(req, res)=>{
  model.Supplier.findById(req.params.id)
    .then(dataSupplier=>{
      model.Item.findAll(
        {
          include:['SupplierItems']
        })
        .then(dataItem=>{
          // res.send(dataItem[0])
          res.render('addItemSupplier', {dataItem:dataItem,dataSupplier:dataSupplier})
        })
    })
})
router.post('/:idSupplier/additem', (req, res)=>{
  model.SupplierItem.create(
    {
      ItemId: req.body.ItemId,
      SupplierId: req.params.idSupplier,
      price: req.body.price
    })
      .then(()=>{
        res.redirect('/supplier')
      })
})

module.exports =  router;
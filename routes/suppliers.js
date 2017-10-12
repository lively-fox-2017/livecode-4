const express = require('express');
var router = express.Router();
const Models = require('../models');
const moneyConverter = require('../helper/moneyConverter');

router.get('/', (req, res)=>{
  Models.Supplier.findAll().then((suppliers)=>{
    let dataPassed = {};
    dataPassed.suppliers = suppliers
    res.render('suppliers/allSuppliers', dataPassed)
  })
})

router.get('/add', (req, res)=>{
  let dataPassed = {}
  res.render('suppliers/addSupplier', dataPassed)
})

router.post('/add', (req, res)=>{
  Models.Supplier.create({name:req.body.name, kota:req.body.kota}).then(()=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id', (req, res)=>{
  Models.Supplier.findById(req.params.id).then((supplier)=>{
    let dataPassed = {supplier}
    res.render('suppliers/editSupplier', dataPassed)
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Supplier.findById(req.params.id).then((supplier)=>{
    supplier.name = req.body.name;
    supplier.kota = req.body.kota;
    supplier.save().then(()=>{
      res.redirect('/suppliers')
    })
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Supplier.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/suppliers')
  })
})

router.get('/:id/additem', (req, res)=>{
  let supplier= null;
  let supplierItems = [];
  Models.Supplier.findById(req.params.id).then((iSupplier)=>{
    supplier = iSupplier;
    return supplier.getItems()
  }).then((item)=>{
    if(item.length==0){
      supplierItems=[]
    }else{
      supplierItems = item
    }

    //res.send(item)
    return Models.Item.findAll()
  }).then((items)=>{
    items=items.filter((item) => {if(!(item in supplierItems)){return item}})
    //res.send(supplierItems)
    //supplierItems.map((item)=>{item.SupplierItem.price = moneyConverter(item.SupplierItem.price); return item})
    //console.log(supplierItems[0].SupplierItem);
    let dataPassed = {supplier, items, supplierItems}
    res.render('suppliers/addItem',dataPassed)
  }).catch((err) => {
    console.log(err);
    res.redirect('/');
  })

})

router.post('/:id/additem', (req, res)=>{
  Models.SupplierItem.create({SupplierId:req.params.id, ItemId:req.body.itemsId, price:req.body.price})
  res.redirect('/suppliers')
})

module.exports = router;

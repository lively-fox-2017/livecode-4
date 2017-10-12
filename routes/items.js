const express = require('express')
const router = express.Router()
const Model = require('../models')


// router.get('/', (req,res) => {
//   Model.Item.findAll()
//   .then(dataItem =>{
//     res.render('items', {dataItems:dataItem})
//   })
// })


router.get('/', (req,res) => {
  Model.Item.findAll({
    order: [['id','ASC']]
  })
  .then(item=>{
    let promise = item.map((data)=>{
      return new Promise((resolve,reject)=>{
        data.getSupplier()
        .then(supplier=>{
          if(supplier != null){
            data.suppliers_name = data.name
          } else {
            data.suppliers_name = 'No Supplier Yet'
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(dataItems =>{
      res.render('items',{dataItems:dataItems, dataError: null})
    })
  })
})

router.get('/add',(req,res)=>{
  Model.Item.findAll()
  .then(dataItem=>{
    res.render('add_items',{dataItem:dataItem})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/add', (req,res)=>{
  Model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
    SupplierId: req.body.SupplierId
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req,res)=>{
  Model.Item.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req,res)=>{
  Model.Item.findById(req.params.id)
  .then(dataItem=>{
    res.render('edit_items',{dataItems:dataItem,dataError: null})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem,
    SupplierId: req.body.SupplierId
  },{
    where: {
      id: req.params.id
    }
  })
  .then(data=>{
    if(err){
      if(err.name = 'SequelizeValidationError'){
        res.render('edit_items',{dataError: 'Harus Unique Mas bro!'})
      } else {
        res.redirect('/items')
      }
    }

  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;

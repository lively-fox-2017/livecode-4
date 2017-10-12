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
  .then(items=>{
    let promise = items.map((data)=>{
      return new Promise((resolve,reject)=>{
        data.getSupplier()
        .then(supplier=>{
          if(supplier){
            data.supplier_name = items.name
          }else {
            data.supplier_name = 'No Supplier Yet'
          }
          resolve(data)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(result =>{
      // console.log(result);
      res.render('items',{dataItems:result})
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
    kota: req.body.kota
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.delete('/delete/:id', (req,res)=>{
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
    res.render('edit_items',{dataItem:dataItem})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  Model.Item.update({
    name: req.body.name,
    kota: req.body.kota
  },{
    where: {
      id: req.params.id
    }
  })
  .then(data=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err)
  })
})


module.exports = router;

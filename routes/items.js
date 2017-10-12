const express = require('express')
const router = express.Router()

const models = require('../models')

router.get('/',(req,res)=>{
  models.Item.findAll().then(dataItems=>{
    res.render('item',{dataItems:dataItems})
  })
})

router.get('/add',(req,res)=>{
  res.render('item_add',{errMsg:''})
})

router.post('/add', (req,res)=>{
  let condition={
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  }
  models.Item.create(condition).then(newItem=>{
    res.redirect('/items')
  }).catch(errMsg=>{
    res.render('item_add',{errMsg:errMsg})
  })
})

router.get('/edit/:id',(req,res)=>{
  models.Item.findById(req.params.id).then(dataItem=>{
    res.render('item_edit',{dataItem:dataItem})
  })
})

router.post('/edit/:id', (req,res)=>{
  let update={
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  }
  let condition={
    where:{id:req.params.id}
  }
  models.Item.update(update,condition).then(updateResult=>{
    res.redirect('/items')

  })
})


router.get('/delete/:id',(req,res)=>{
  models.Item.findById(req.params.id).then(dataItem=>{
    res.render('item_delete',{dataItem:dataItem})
  })
})

router.post('/delete/:id', (req,res)=>{
  let condition={
    where:{id:req.params.id}
  }
  models.Item.destroy(condition).then(updateResult=>{
    res.redirect('/items')

  })
})


module.exports = router

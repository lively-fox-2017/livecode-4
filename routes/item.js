const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res)=>{
  model.Item.findAll().then(dataItem=>{
    // res.send(items);
    res.render('item', {items:dataItem})
  })
})

router.get('/add', (req, res)=>{
  res.render('item-add')
})

router.post('/add', (req, res)=>{
  console.log(req.body);
  model.Item.create(req.body).then(dataItem=>{
    res.redirect('/items')
  }).catch(err=>{
    res.render('item-add', {msg:'Code Item harus Unik'})
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Item.findOne({where:req.params}).then(dataItem=>{
    // res.redirect('/items')
    res.render('item-edit', {item:dataItem})
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Item.update(req.body, {where:req.params}).then(dataItem=>{
    res.redirect('/items')
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Item.destroy({where:req.params}).then(dataItem=>{
    res.redirect('/Items')
  })
})

module.exports = router;

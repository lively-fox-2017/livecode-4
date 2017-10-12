var express = require('express')
var router = express.Router()

let model = require('../models');

router.get('/', (req,res)=>{
  model.Item.findAll()
    .then(dataItem=>{
        res.render('item',{dataItem:dataItem});
  })
})

router.get('/add', (req, res)=>{
  res.render('addItem')
})
router.post('/add', (req, res)=>{
  model.Item.create(
    {
      name: req.body.name,
      brand: req.body.brand,
      codeitem: req.body.codeitem
    }).then(()=>{
      res.redirect('/Item');
    })
})

router.get('/edit/:id',(req, res)=>{
  model.Item.findById(req.params.id)
    .then(editItem=>{
      res.render('editItem', {editItem:editItem})
    })
})

router.post('/edit/:id', (req, res)=>{
  model.Item.update(
    {
      name: req.body.name,
      kota: req.body.kota
    },{
      where: {
        id: req.params.id
      }
    }).then(()=>{
      res.redirect('/Item')
    })
})
router.get('/delete/:id', (req, res)=>{
  model.Item.destroy(
    {
      where:{
        id: req.params.id
      }
    })
    .then(()=>{
      res.redirect('/Item')
    })
})

module.exports =  router;
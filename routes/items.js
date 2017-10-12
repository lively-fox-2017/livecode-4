const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res)=>{
  model.Item.findAll({order:[['id', 'ASC']]})
  .then(dataItems=>{
    res.render('items', {dataItems})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('add_items', {error: null})
})

router.post('/add', (req, res)=>{
  model.Item.create({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.render('add_items', {error:err.message})
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Item.findById(req.params.id)
  .then(dataItems=>{
    // res.send(dataItems)
    res.render('edit_items', {dataItems: dataItems, error: null})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  },{
    where: {id:req.params.id}
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    model.Item.findById(req.params.id)
    .then(dataItems=>{
      res.render('edit_items', {dataItems: dataItems, error:err.message})
    })

  })
})

router.get('/delete/:id', (req, res)=>{
  model.Item.destroy({where: {id:req.params.id}})
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router;

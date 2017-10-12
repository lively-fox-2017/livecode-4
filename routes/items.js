const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res)=>{
  Models.Item.findAll().then((items)=>{
    console.log(items);
    let dataPassed = {items}
    res.render('items/allItems', dataPassed)
  })
})

router.get('/edit/:id', (req, res)=>{
  Models.Item.findById(req.params.id).then((item)=>{
    let dataPassed = {item};
    res.render('/items/editItem', dataPassed);
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Item.findById(req.params.id).then((item)=>{
    item.name = req.body.name;
    item.brand = req.body.brand;
    item.codeitem = req.body.codeitem;
    item.save().then(()=>{
      res.redirect('/items');
    })
  })
})

module.exports = router;

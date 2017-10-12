const express = require('express');
const router = express.Router();
const Models = require('../models');

router.get('/', (req, res)=>{
  Models.Item.findAll({include:[Models.Supplier]}).then((items)=>{
    console.log(items);
    let dataPassed = {items}
    res.render('items/allItems', dataPassed)
  })
})

router.get('/edit/:id', (req, res)=>{
  Models.Item.findById(req.params.id).then((item)=>{
    let dataPassed = {item};
    dataPassed.err='';
    res.render('items/editItem', dataPassed);
  })
})

router.post('/edit/:id', (req, res)=>{
  Models.Item.findById(req.params.id).then((item)=>{
    item.name = req.body.name;
    item.brand = req.body.brand;
    item.codeitem = req.body.codeitem;
    item.save().then(()=>{
      res.redirect('/items');
    }).catch((err)=>{
      let dataPassed = {err}
      res.render('items/editItem', dataPassed);
    })
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Item.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/items')
  })
})

router.get('/add', (req,res)=>{
  let dataPassed = {err:''}
  res.render('items/addItem', dataPassed)
})

router.post('/add', (req, res)=>{
  Models.Item.create({name:req.body.name, brand:req.body.brand, codeitem:req.body.codeitem}).then((item)=>{
    res.redirect('/items')
  }).catch((err) => {
    let dataPassed = {err}
    res.render('items/addItem', dataPassed)
  })
})


module.exports = router;

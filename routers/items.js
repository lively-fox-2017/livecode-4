let express = require('express');
let router = express.Router();
let model = require('../models');

// ------------------ CRUD ----------- //


// CREATE
router.get('/add', function(req,res){
  model.Item.findAll().then(data_Items =>{
    res.render('items-add', {data_ItemsToEjs:data_Items})
  })
})

router.post('/add', function(req,res){
  model.Item.create({
    name : req.body.items_name,
    brand : req.body.items_brand,
    codeitem : req.body.items_codeitem
  }).then(data_Items =>{
    res.redirect('../../items')
  })
})

// READ
router.get('/', function(req,res){
  model.Item.findAll().then(data_Items =>{
    res.render('items', {data_ItemsToEjs:data_Items})
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  model.Item.findById(req.params.id).then(data_Items =>{
    res.render('items-edit', {data_ItemsToEjs:data_Items})
  })
})

router.post('/edit/:id', function(req,res){
  model.Item.update({
    name : req.body.items_name,
    brand : req.body.items_brand,
    codeitem : req.body.items_codeitem
  },{where:{id:req.params.id}}).then(data_Items =>{
    res.redirect('../../items')
  })
})

// DELETE
router.get('/delete/:id', function(req,res){
  model.Item.destroy({where:{id:req.params.id}}).then(data_Items => {
    res.redirect('../../items')
  })
})

module.exports = router

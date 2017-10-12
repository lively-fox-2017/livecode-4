const express = require('express')
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res) {
  models.Item.findAll()
  .then(rows=>{
    res.render('item_list',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/add', function (req, res) {
  models.Item.create({
    name:`${req.body.name}`,
    brand:`${req.body.brand}`,
    codeitem:`${req.body.codeitem}`
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/edit/:id', function (req, res) {
  models.Item.findById(req.params.id)
  .then(rows=>{
    res.render('item_edit',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/edit/:id', function (req, res) {
  models.Item.update({
    name:`${req.body.name}`,
    brand:`${req.body.brand}`,
    codeitem:`${req.body.codeitem}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/delete/:id', function (req, res) {
  models.Item.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    res.send(err);
  })
})
module.exports = router;

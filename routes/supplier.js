const express = require('express')
const router = express.Router();
const models = require('../models');

router.get('/', function (req, res) {
  models.Supplier.findAll({
    include:[{
      model: models.Item
    }]
  })
  .then(rows=>{
    // res.send(rows)
    res.render('supplier_list',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/add', function (req, res) {
  models.Supplier.create({
    nama:`${req.body.nama}`,
    kota:`${req.body.kota}`
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/edit/:id', function (req, res) {
  models.Supplier.findById(req.params.id)
  .then(rows=>{
    res.render('supplier_edit',{data:rows})
  })
  .catch(err=>{
    res.send(err);
  })
})
router.post('/edit/:id', function (req, res) {
  models.Supplier.update({
    nama:`${req.body.nama}`,
    kota:`${req.body.kota}`
  },{
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/delete/:id', function (req, res) {
  models.Supplier.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err);
  })
})
router.get('/:id/add_items', function (req, res) {
  models.Supplier.findById(req.params.id)
  .then(rows=>{
    models.Items.findAll()
    .then(rowsItem=>{
      // res.send(rows)
      res.render('supplier_list',{data:rows})      
    })
  })
  .catch(err=>{
    res.send(err);
  })
})
module.exports = router;

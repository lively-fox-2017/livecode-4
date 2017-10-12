const express = require('express')
const router = express.Router();
const models = require('../models');
const formatUang = require('../helper/formatUang');

router.get('/', function (req, res) {
  models.Item.findAll({
    include:[{
      model: models.Supplier
    }]
  })
  .then(rows=>{

    // let promListItem=rows.map(x=>{
    //   return new Promise(function(resolve,reject){
    //     // console.log('asdfadfasdfsdf');
    //     let suppliers=x.Suppliers.map(y=>{
    //       console.log(formatUang(y.SupplierItem.price));
    //       let price=formatUang(y.SupplierItem.price);
    //       y.SupplierItem.price=price
    //       return y
    //     })
    //     x.Suppliers=suppliers;
    //     console.log(formatUang(x.Suppliers.SupplierItem.price));
    //
    //
    //     resolve(x);
    //   })
    // })
    // Promise.all(promListItem)
    // .then(rowsItems=>{
    //   // console.log(rowsItems)
    //   res.send(rowsItems)
      res.render('item_list',{data:rows})
    // })
    // .catch(err=>{
    //   res.send(err)
    // })
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

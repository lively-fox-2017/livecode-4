const express=require('express');
const router= express.Router()
const model= require ('../models')

router.get('/',(req,res)=>{
  model.Item.findAll()
  .then(dataItem=>{
    // res.send('masuk')
    res.render('item',{dataItem:dataItem})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add',(req,res)=>{
  res.render('additem',{error:null})
})

router.post('/add',(req,res)=>{
  model.Item.create({
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  })
  .then(()=>{
    // res.send('oi')
    res.redirect('/item')
  })
  .catch(err=>{
    res.render('item',{error:err})
  })
})

router.get('/delete/:id',(req,res)=>{
  model.Item.destroy({
    where:{id:req.params.id}
  })
  .then(dataItem=>{
    res.redirect('/item')
  })
})

router.get('/edit/:id',(req,res)=>{
  model.Item.findAll({
    where:{id:req.params.id}
  })
  .then(dataItem=>{
    res.render('edititem',{dataItem:dataItem[0]})
  })
})

router.post('/edit/:id',(req,res)=>{
  model.Item.update({
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  },{where:{
    id:req.params.id}
    })
    .then(()=>{
      // res.send('jajal')
      res.redirect('/item')
    })
})
module.exports = router;

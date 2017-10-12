const express=require('express');
const router= express.Router()
const model= require ('../models')

router.get('/',(req,res)=>{
  model.Supplier.findAll()
  .then(dataSupplier=>{
    // res.send('masuk')
    res.render('supplier',{dataSupplier:dataSupplier})
  })
})

router.get('/add',(req,res)=>{
    // res.send('oi')
    res.render('addsupplier')
    // ,{dataSupplier:dataSupplier})
  // })
})

router.post('/add',(req,res)=>{
  model.Supplier.create({
    name:req.body.name,
    kota:req.body.kota
  })
  .then(()=>{
    // res.send('oi')
    res.redirect('/supplier')
  })
})

router.get('/delete/:id',(req,res)=>{
  model.Supplier.destroy({
    where:{id:req.params.id}
  })
  .then(dataSupplier=>{
    res.redirect('/supplier')
  })
})

router.get('/edit/:id',(req,res)=>{
  model.Supplier.findAll({
    where:{id:req.params.id}
  })
  .then(dataSupplier=>{
    res.render('editsupplier',{dataSupplier:dataSupplier[0]})
  })
})

router.post('/edit/:id',(req,res)=>{
  model.Supplier.update({
    name:req.body.name,
    kota:req.body.kota
  },{where:{
    id:req.params.id}
    })
    .then(()=>{
      // res.send('jajal')
      res.redirect('/supplier')
    })
})
module.exports = router;

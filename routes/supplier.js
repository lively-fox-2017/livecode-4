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
  model.Supplier.destroy({})
})
module.exports = router;











router.post('/addsubject/:id',(req,res)=>{
  model.StudentSubject.create({
    StudentId:req.params.id,
    SubjectId:req.body.subject_name
  })
    .then(()=>{
      res.redirect('/student')
      // res.send(data)
  })
})

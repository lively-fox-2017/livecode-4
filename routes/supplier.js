const express = require('express')
const router = express.Router()
const model = require('../models')


router.get('/', (req, res)=>{
  model.Supplier.findAll()
  .then(suppliers => {
    res.render('suppliers', {suppliers: suppliers})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.get('/add', (req, res)=>{
  model.Supplier.findAll()
  .then(suppliers =>{
    res.render('suppliersAdd', {suppliers: suppliers, err: false});
  })
  .catch(err =>{

    console.log(err);

  });
});

router.post('/add', (req, res)=>{
  model.Supplier.build({
    name: req.body.name,
    kota: req.body.kota
  })
  .save().then((suppliers)=>{
    res.redirect('/suppliers')
  })
  .catch((err)=>{
    // res.send(err);
    res.render('suppliers', {title:'Add suppliers', err: false})
  });
});

router.get('/edit/:id', (req,res)=>{
  model.Supplier.findAll({
    where: {id: req.params.id}
  })
  .then((suppliers)=>{
    res.render('supplliersEdit', {suppliers:suppliers, err: false})
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req,res)=>{
  model.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  },
  {
    where: {id:req.params.id}
  })
  .then(suppliers=>{
    res.redirect('/suppliers')
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Supplier.destroy({
    where:{id:req.params.id}
  })
  .then((suppliers)=>{
    res.redirect('/suppliers')
  })
  .catch((err)=>{
    res.send(err)
  })
})

//

//associate
router.get('/:id/addsubject', (req, res)=>{
  model.Student.findAll({
    where: {id: `${req.params.id}`}
  })
  .then(student => {
    model. Subject.findAll()
    .then(subject => {
      res.render('studentAddSubject', {dataStudent: student, dataSubject: subject, title: 'Add Subject'})
    })
    .catch(err =>{
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/:id/addsubject', (req, res)=>{
  model.SubjectStudent.create({
    StudentId: `${req.params.id}`,
    SubjectId: `${req.body.SubjectId}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(student => {
    res.redirect('/students')
    // res.send(student)
  })
  .catch(err=> {
    console.log(err);
  })
})

module.exports = router

module.exports= router

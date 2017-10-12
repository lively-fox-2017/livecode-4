const express = require('express')
const router = express.Router()
const model = require('../models')


router.get('/', (req, res)=>{
  model.Item.findAll()
  .then(items => {
    res.render('items', {items: items})
  })
  .catch(err =>{
    console.log(err);
  });
});

router.get('/add', (req, res)=>{
  model.Item.findAll()
  .then(items =>{
    res.render('itemsAdd', {items: items, err: false});
  })
  .catch(err =>{

    console.log(err);

  });
});

router.post('/add', (req, res)=>{
  model.Item.build({
    name: req.body.name,
    kota: req.body.kota
  })
  .save().then((items)=>{
    res.redirect('/items')
  })
  .catch((err)=>{
    // res.send(err);
    res.render('items', {title:'Add items', err: false})
  });
});

router.get('/edit/:id', (req,res)=>{
  model.Item.findAll({
    where: {id: req.params.id}
  })
  .then((items)=>{
    res.render('itemsEdit', {items:items, err: false})
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req,res)=>{
  model.Item.update({
    name: req.body.name,
    brand: req.body.brand,
    codeitem: req.body.codeitem
  },
  {
    where: {id:req.params.id}
  })
  .then(items=>{
    res.redirect('/items')
  })
  .catch((err)=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Item.destroy({
    where:{id:req.params.id}
  })
  .then((items)=>{
    res.redirect('/items')
  })
  .catch((err)=>{
    res.send(err)
  })
})

module.exports= router

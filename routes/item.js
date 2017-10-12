const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', (req, res)=>{
  model.Item.findAll({
    include: [{
      model: model.Supplier
    }]
  }).then(dataItem=>{
    // res.send(items);
    res.render('item', {items:dataItem})
  })
})

router.get('/add', (req, res)=>{
  res.render('item-add', {msg:''})
})

router.post('/add', (req, res)=>{
  let rgx = /(HP|SW|LP)\d{4}/;
  if(req.body.codeitem.match(rgx)){
    model.Item.create(req.body).then(dataItem=>{
      res.redirect('/items')
    })
    .catch(err=>{
      res.render('item-add', {msg:err.message})
    })
  }else{
    res.render('item-add', {msg:'Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka'})
  }

})

router.get('/edit/:id', (req, res)=>{
  model.Item.findOne({where:req.params}).then(dataItem=>{
    // res.redirect('/items')
    res.render('item-edit', {item:dataItem})
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Item.update(req.body, {where:req.params}).then(dataItem=>{
    res.redirect('/items')
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Item.destroy({where:req.params}).then(dataItem=>{
    res.redirect('/Items')
  })
})

module.exports = router;

const express = require('express');
const router = express.Router();
const model = require('../models');

router.get('/', (req, res)=>{
  model.Supplier.findAll({order:[['id', 'ASC']]})
  .then(dataSuppliers=>{
    // console.log(dataSuppliers);
    let promise = dataSuppliers.map(Supplier=>{
      return new Promise(function(resolve, reject) {
        Supplier.getItems()
        .then(item=>{
          if (item){
            Supplier.items_name = item.name
          }else {
            Supplier.items_name = 'No item yet'
          }
          resolve(Supplier)
        })
        .catch(err=>{
          reject(err)
        })
      })
    })
    Promise.all(promise)
    .then(dataSuppliersfix=>{
      // res.send(dataSuppliersfix)
      res.render('suppliers',{dataSuppliers: dataSuppliersfix})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})


router.get('/add', (req, res)=>{
  res.render('add_suppliers')
})

router.post('/add', (req, res)=>{
  model.Supplier.create({
    name: req.body.name,
    kota: req.body.kota
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  model.Supplier.findById(req.params.id)
  .then(dataSuppliers=>{
    // res.send(dataSuppliers)
    res.render('edit_suppliers', {dataSuppliers})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  model.Supplier.update({
    name: req.body.name,
    kota: req.body.kota
  },{
    where: {id:req.params.id}
  })
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  model.Supplier.destroy({where: {id:req.params.id}})
  .then(()=>{
    res.redirect('/suppliers')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/:id/additem', (req, res)=>{
  model.Supplier.findById(req.params.id)
  .then(dataSuppliers=>{
    model.Item.findAll()
    .then(dataItems=>{
      res.render('add_items_suppliers', {dataSuppliers, dataItems})
    })
  })
  .catch(err=>[
    res.send(err)
  ])

})

module.exports = router;

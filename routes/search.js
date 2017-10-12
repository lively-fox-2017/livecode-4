const express = require('express');
const router = express.Router();

const Model = require('../models');

router.get('/', (req, res) => {

  if (req.query.hasOwnProperty('name')) {

    Model.SupplierItem.findAll({
      include: [ Model.Item, Model.Supplier ],
      where: {
        '$Item.name$': { $iLike: '%'+req.query.name+'%' },
        price: { $between: [req.query.min, req.query.max] }
      }
    }).then((items) => {
      res.render('search', {
        searchResult: items,
        inputs: {
          name: req.query.name,
          min: req.query.min,
          max: req.query.max,
        }
      });
    });

  } else {
    res.render('search', {
      inputs: null
    });
  }
});

module.exports = router;

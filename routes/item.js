const express = require('express')
const router = express.Router()
const Model = require("../models")

router.get("/", (req, res) => {
  Model.Item.findAll({order:[["id","ASC"]]}).then((rowsItem) => {
    res.render("item", {dataItem: rowsItem, title: "List Item"})
  })
})

router.get("/add", (req, res) => {
  let error = null;
  if (req.query.err) {
    error = req.query.err;
  }

  res.render("inputItem", {error: error, title: "Add Item"})
})

router.post("/add", (req, res) => {
  Model.Item.create({name: req.body.name, brand: req.body.brand, codeitem: req.body.codeitem}).then(() => {
    res.redirect("/items");
  }).catch((reason) => {
    // console.log(reason.errors[0].message);
    res.redirect("/items/add?err="+reason.errors[0].message)
  })
})

router.get("/edit/:id", (req, res) => {
  let error = null;

  if (req.query.err) {
    error = req.query.err;
  }

  Model.Item.findOne({where: {id: req.params.id}}).then((rowItem) => {
    res.render("editItem", {dataItem: rowItem, error: error, title: "Edit Item"})
  })
})

router.post("/edit/:id", (req, res) => {
  Model.Item.update({id: req.params.id, name: req.body.name, brand: req.body.brand, codeitem: req.body.codeitem}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/items")
  }).catch((reason) => {
    res.redirect("/items/edit/"+req.params.id+"?err="+reason.errors[0].message)
  })
})

router.get("/delete/:id", (req, res) => {
  Model.Item.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect("/items");
  })
})


module.exports = router;

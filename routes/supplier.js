const express = require('express')
const router = express.Router()
const Model = require("../models")

router.get("/", (req, res) => {
  Model.Supplier.findAll({include:[Model.Item], order:[["id","ASC"]]}).then((rowsSupplier) => {
    // res.send(rowsSupplier)
    res.render("supplier", {dataSupplier: rowsSupplier, title: "List Supplier"})
  })
})

router.get("/add", (req, res) => {
  res.render("inputSupplier", {title: "Add Supplier"})
})

router.post("/add", (req, res) => {
  Model.Supplier.create({name: req.body.name, kota: req.body.kota}).then(() => {
    res.redirect("/suppliers");
  })
})

// router.get("/additem/:id", (req, res) => {
//   Model.SupplierItem.findAll({where: {supplierId: req.params.id}}).then((rowsSupplierItem) => {
//   })
//   res.render("inputSupplier", {title: "Add Supplier"})
// })

router.get("/edit/:id", (req, res) => {
  Model.Supplier.findOne({where: {id: req.params.id}}).then((rowSupplier) => {
    res.render("editSupplier", {dataSupplier: rowSupplier, title: "Edit Supplier"})
  })
})

router.post("/edit/:id", (req, res) => {
  Model.Supplier.update({name: req.body.name, kota: req.body.kota}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/suppliers")
  })
})

router.get("/delete/:id", (req, res) => {
  Model.Supplier.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect("/suppliers");
  })
})


module.exports = router;

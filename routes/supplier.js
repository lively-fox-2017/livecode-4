const express = require('express')
const router = express.Router()
const Model = require("../models")

router.get("/", (req, res) => {
  Model.Supplier.findAll().then((rowsSupplier) => {
    res.render("supplier", {dataSupplier: rowsSupplier, title: "List Supplier"})
  })
})

router.get("/add", (req, res) => {
  let error = null;

  if (req.query.error) {
    error = req.query.error
  }

  res.render("inputSupplier", {title: "Add Supplier", error: error})
})

module.exports = router;

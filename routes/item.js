const express = require('express')
const router = express.Router()
const Model = require("../models")

router.get("/", (req, res) => {
  Model.Item.findAll().then((rowsItem) => {
    res.render("item", {title: "List Item", dataItem: rowsItem});
  })
})

module.exports = router;

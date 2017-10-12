/*
GET /items (menampilkan semua data item) 
GET /items/add (menampilkan form untuk input)
POST /items/add (menghandle input dari form)
GET /items/edit/:id (menampilkan form data items berdasarkan id)
POST /items/edit/:id (meng-handle input dari form saat update)
GET /items/delete/:id (men-delete data items berdasarkan id)
*/

// require express
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	res.render('items/index')
})

module.exports = router
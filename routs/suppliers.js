const express = require('express')
const router = express.Router()
const model = require('../models')
router.get('/', (req,res) => {
	model.Supplier.findAll().then(suppliers => {
		let prom = []
		suppliers.forEach(supp => {
			prom.push(model.SupplierItem.findAll({where:{SupplierId:supp.id}}))
		})

		// let prom = suppliers.map(supplier => {
		// 	return new Promise((resolve,reject) => {
		// 		supplier.getSupplierItems().then(items => {
		// 			if(items){
		// 				let newSupplier = items.map(item => {
		// 					supplier['item_name'] = item.name
		// 				})
		// 			} else {
		// 				supplier['item_name'] = "No Item Yet"
		// 			}
		// 			console.log(items)
		// 		})
		// 		console.log(supplier)
		// 		resolve(supplier)
		// 	})
		// })
		Promise.all(prom).then(suppliers => {
			res.render('supplier', {data:suppliers})
		})
		// console.log(prom)
	})
})
router.get('/add', (req,res) => {
	res.render('supplier_add')
})
router.post('/add', (req,res) => {
	model.Supplier.create(req.body).then(add => {
		res.redirect('/suppliers')
	})
})
router.get('/edit/:id', (req,res) => {
	model.Supplier.findById(req.params.id).then(supplier => {
		res.render('supplier_edit', {data:supplier})
	})
})
router.post('/edit/:id', (req,res) => {
	model.Supplier.update(req.body,{where:{id:req.params.id}}).then(edit => {
		res.redirect('/suppliers')
	})
})
router.get('/delete/:id', (req,res) => {
	model.Supplier.destroy({where:{id:req.params.id}}).then(del => {
		res.redirect('/suppliers')
	})
})
module.exports = router
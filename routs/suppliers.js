const express = require('express')
const router = express.Router()
const model = require('../models')
router.get('/', (req,res) => {
	model.Supplier.findAll().then(suppliers => {
		let prom = suppliers.map(supplier => {
			return new Promise((resolve,reject) => {
				supplier.getItems().then(items => {
					if(items){
						let newSupplier = items.map(item => {
							return item.name
						})
						supplier["item_name"] = newSupplier
					} 
					else {
						supplier["item_name"] = "No Item Yet"
					}
					resolve(supplier)
				})
			})
		})
		Promise.all(prom).then(suppliers => {
			res.render('supplier', {data:suppliers})
		})
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
router.get('/assign/:id', (req,res) => {
	model.Supplier.findOne({where:{id:req.params.id}}).then(row_supplier => {
		model.Item.findAll().then(row_items => {
			res.render('supplier_assign_item', {row_supplier:row_supplier,row_items:row_items})
		})
	})
	.catch(err => {
		res.send(err)
	})
})
module.exports = router
const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();
const models = require('./../models');
const Op = Sequelize.Op;

// tampilkan semua data supplier
router.get('/', (req, res) => {
	models.Supplier.findAll()
	.then(suppliers => {
		res.render('suppliers', {suppliers});
	})
	.catch(err => {
		if (err) throw err;
	});
});

// tampilkan form input untuk menambahkan supplier
router.get('/add', (req, res) => {
	res.render('supplier-add');
});

// menambahkan supplier dengan data dari form input /add
router.post('/add', (req, res) => {
	const values = {
		name: req.body.name,
		kota: req.body.kota,
		createdAt: new Date(),
		updatedAt: new Date()
	}

	models.Supplier.create(values)
	.then(() => {
		res.redirect('/suppliers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

// menampilkan form data supplier berdasarkan id
router.get('/edit/:id', (req, res) => {
	const options = {where: {id: req.params.id}};

	models.Supplier.findOne(options)
	.then(supplier => {
		res.render('supplier-edit', {supplier});
	})
	.catch(err => {
		if (err) throw err;
	});
});

// mengupdate supplier berdasarkan id dari form /edit/:id
router.post('/edit/:id', (req, res) => {
	const options = {where: {id: req.params.id}};
	const values = {
		name: req.body.name,
		kota: req.body.kota,
		updatedAt: new Date()
	}

	models.Supplier.update(values, options)
	.then(() => {
		res.redirect('/suppliers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

// delete data supplier berdasarkan id
router.delete('/delete/:id', (req, res) => {
	const options = {where: {id: req.params.id}};

	models.Supplier.destroy(options)
	.then(() => {
		res.redirect('/suppliers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.get('/:id/additem', (req, res) => {
	const supplierOptions = {where: {id: req.params.id}};
	const supplierItemOptions = {where: {SupplierId: req.params.id}};

	Promise.all([
		models.Supplier.findOne(supplierOptions),
		models.SupplierItem.findAll(supplierItemOptions),
		models.Item.findAll()
		])
	.then(values => {
		const supplier = values[0];
		const supplierItems = values[1];
		const items = values[2];
		const ownedItemIds = supplierItems.map(supplierItem => supplierItem.ItemId);
		const unOwnedItems = items.filter(item => ownedItemIds.indexOf(item.id) === -1);
		
		res.send({supplier, supplierItems, unOwnedItems});
		// res.render('supplier-add-item', {supplier});
	})
	.catch(err => {
		if (err) throw err;
	});
});

router.post('/:id/additem', (req, res) => {
	const values = {
		SupplierId: 1/*req.params.id*/,
		ItemId: 2/*req.body.itemId*/,
		price: 1000000/*req.body.price*/
	}
	models.SupplierItem.create(values)
	.then(() => {
		res.redirect('/suppliers');
	})
	.catch(err => {
		if (err) throw err;
	});
});

module.exports = router;
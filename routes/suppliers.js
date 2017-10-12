const express = require('express');
const router = express.Router();
const models = require('./../models');

// tampilkan semua data supplier
router.get('/', (req, res) => {
	models.Supplier.findAll()
	.then(suppliers => {
		res.send(suppliers);
	})
	.catch(err => {
		if (err) throw err;
	});
});

// tampilkan form input untuk menambahkan supplier
router.get('/add', (req, res) => {
	res.send('Input Form Buat ADD SUPPLIER');
});

// menambahkan supplier dengan data dari form input /add
router.post('/add', (req, res) => {
	const options = {where: {id: req.params.id}};
	const values = {
		name: null,
		kota: null,
		createdAt: new Date(),
		updatedAt: new Date()
	}

	models.Supplier.create(values, options)
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
		res.send(supplier);
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

module.exports = router;
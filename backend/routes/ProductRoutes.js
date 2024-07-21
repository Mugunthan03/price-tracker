const express = require('express');
const router = express.Router();
const { fetchProduct } = require('../controllers/productController');

router.post('/fetch-product', fetchProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const getProducts = require('../controllers/product/getProducts');
const getProductById = require('../controllers/product/getProductById');
const getCategories = require('../controllers/product/getCategories');

router.get('/categories', getCategories);
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

module.exports = router;

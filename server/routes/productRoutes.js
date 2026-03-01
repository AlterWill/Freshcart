const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getCategories } = require('../controllers/productController');

router.get('/categories', getCategories);
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

module.exports = router;

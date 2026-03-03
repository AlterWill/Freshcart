const express = require('express');
const router = express.Router();
const getCart = require('../controllers/cart/getCart');
const addToCart = require('../controllers/cart/addToCart');
const updateCartItem = require('../controllers/cart/updateCartItem');
const removeFromCart = require('../controllers/cart/removeFromCart');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.route('/:itemId')
    .put(protect, updateCartItem)
    .delete(protect, removeFromCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const placeOrder = require('../controllers/order/placeOrder');
const getOrderHistory = require('../controllers/order/getOrderHistory');
const { protect } = require('../middleware/authMiddleware');

router.post('/place', protect, placeOrder);
router.get('/history', protect, getOrderHistory);

module.exports = router;

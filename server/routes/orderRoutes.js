const express = require('express');
const router = express.Router();
const { placeOrder, getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/place', protect, placeOrder);
router.get('/history', protect, getOrderHistory);

module.exports = router;

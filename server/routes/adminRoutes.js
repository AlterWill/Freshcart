const express = require('express');
const router = express.Router();
const { getDashboard, getOrders, updateOrder, createProduct } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin); // Apply to all admin routes

router.get('/dashboard', getDashboard);
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrder);
router.post('/products', createProduct);

module.exports = router;

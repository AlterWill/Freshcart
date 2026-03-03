const express = require('express');
const router = express.Router();
const getDashboard = require('../controllers/admin/getDashboardStats');
const getOrders = require('../controllers/admin/getAllOrders');
const updateOrder = require('../controllers/admin/updateOrderStatus');
const createProduct = require('../controllers/admin/addProduct');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin); // Apply to all admin routes

router.get('/dashboard', getDashboard);
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrder);
router.post('/products', createProduct);

module.exports = router;

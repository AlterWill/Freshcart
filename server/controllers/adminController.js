const Admin = require('../models/adminModel');

const getDashboard = async (req, res) => {
    try {
        const stats = await Admin.getDashboardStats();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Admin.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        await Admin.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category_id, description, image_url } = req.body;
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const insertId = await Admin.addProduct(req.body);
        res.status(201).json({ message: 'Product created', id: insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDashboard,
    getOrders,
    updateOrder,
    createProduct
};

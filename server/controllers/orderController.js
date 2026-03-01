const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.getOrCreateCart(req.user.id);
        const cartItems = await Cart.getItems(cart.id);

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount and check stock
        let totalAmount = 0;
        for (let item of cartItems) {
            if (item.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
            }
            totalAmount += item.price * item.quantity;
        }

        const orderId = await Order.createOrderWithTransaction(req.user.id, totalAmount, cartItems);
        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.findByUserId(req.user.id);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    placeOrder,
    getOrderHistory
};

const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.getOrCreateCart(req.user.id);
        const items = await Cart.getItems(cart.id);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }
        const cart = await Cart.getOrCreateCart(req.user.id);
        await Cart.addItem(cart.id, productId, quantity);
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Valid quantity is required' });
        }
        await Cart.updateItemQuantity(itemId, quantity);
        res.json({ message: 'Cart item updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        await Cart.removeItem(itemId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};

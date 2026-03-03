const Cart = require('../../models/cartModel');

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

module.exports = addToCart;

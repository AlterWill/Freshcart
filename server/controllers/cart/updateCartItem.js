const Cart = require('../../models/cartModel');

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

module.exports = updateCartItem;

const Cart = require('../../models/cartModel');

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

module.exports = removeFromCart;

const Cart = require('../../models/cartModel');

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

module.exports = getCart;

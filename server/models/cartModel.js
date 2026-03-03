const db = require('../config/db');

const Cart = {
    getOrCreateCart: async (userId) => {
        let [rows] = await db.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
        if (rows.length === 0) {
            const [insertRows] = await db.query('INSERT INTO cart (user_id) VALUES ($1) RETURNING id', [userId]);
            return { id: insertRows[0].id, user_id: userId };
        }
        return rows[0];
    },
    getItems: async (cartId) => {
        const [rows] = await db.query(`
            SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.stock, p.image_url, p.description
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.cart_id = $1
        `, [cartId]);
        return rows;
    },
    addItem: async (cartId, productId, quantity) => {
        const [existing] = await db.query('SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);
        if (existing.length > 0) {
            const newQuantity = existing[0].quantity + quantity;
            await db.query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [newQuantity, existing[0].id]);
        } else {
            await db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity]);
        }
    },
    updateItemQuantity: async (cartItemId, quantity) => {
        await db.query('UPDATE cart_items SET quantity = $1 WHERE id = $2', [quantity, cartItemId]);
    },
    removeItem: async (cartItemId) => {
        await db.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
    },
    clearCart: async (cartId) => {
        await db.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
    }
};

module.exports = Cart;

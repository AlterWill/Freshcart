const db = require('../config/db');

const Cart = {
    getOrCreateCart: async (userId) => {
        let [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            const [result] = await db.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
            return { id: result.insertId, user_id: userId };
        }
        return rows[0];
    },
    getItems: async (cartId) => {
        const [rows] = await db.query(`
            SELECT ci.id as cart_item_id, ci.quantity, p.* 
            FROM cart_items ci 
            JOIN products p ON ci.product_id = p.id 
            WHERE ci.cart_id = ?
        `, [cartId]);
        return rows;
    },
    addItem: async (cartId, productId, quantity) => {
        const [existing] = await db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
        if (existing.length > 0) {
            const newQuantity = existing[0].quantity + quantity;
            await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, existing[0].id]);
        } else {
            await db.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cartId, productId, quantity]);
        }
    },
    updateItemQuantity: async (cartItemId, quantity) => {
        await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, cartItemId]);
    },
    removeItem: async (cartItemId) => {
        await db.query('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
    },
    clearCart: async (cartId) => {
        await db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    }
};

module.exports = Cart;

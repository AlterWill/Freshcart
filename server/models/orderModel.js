const db = require('../config/db');

const Order = {
    createOrderWithTransaction: async (userId, totalAmount, cartItems) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Create Order
            const [orderRows] = await connection.query(
                'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
                [userId, totalAmount, 'Pending']
            );
            const orderId = orderRows[0].id;

            // 2. Insert Order Items and 3. Reduce Stock
            for (let item of cartItems) {
                // Insert order item
                await connection.query(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                    [orderId, item.product_id, item.quantity, item.price]
                );

                // Reduce stock
                await connection.query(
                    'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $3',
                    [item.quantity, item.product_id, item.quantity]
                );
            }

            // 4. Clear Cart Items
            const [cartRows] = await connection.query('SELECT id FROM cart WHERE user_id = $1', [userId]);
            if (cartRows.length > 0) {
                await connection.query('DELETE FROM cart_items WHERE cart_id = $1', [cartRows[0].id]);
            }

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    findByUserId: async (userId) => {
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

        // Fetch items for each order
        for (let order of orders) {
            const [items] = await db.query(`
                SELECT oi.*, p.name, p.image_url 
                FROM order_items oi 
                JOIN products p ON oi.product_id = p.id 
                WHERE oi.order_id = $1
            `, [order.id]);
            order.items = items;
        }

        return orders;
    }
};

module.exports = Order;

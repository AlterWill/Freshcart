const db = require('../config/db');

const Admin = {
    getDashboardStats: async () => {
        const [[{ totalSales }]] = await db.query('SELECT SUM(total_amount) as totalSales FROM orders WHERE status = "Delivered"');
        const [[{ totalOrders }]] = await db.query('SELECT COUNT(*) as totalOrders FROM orders');
        const [[{ totalProducts }]] = await db.query('SELECT COUNT(*) as totalProducts FROM products');
        const [lowStockProducts] = await db.query('SELECT * FROM products WHERE stock < 10 ORDER BY stock ASC');

        return {
            totalSales: totalSales || 0,
            totalOrders: totalOrders || 0,
            totalProducts: totalProducts || 0,
            lowStockProducts
        };
    },
    getAllOrders: async () => {
        const [orders] = await db.query(`
            SELECT o.*, u.name as user_name, u.email as user_email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            ORDER BY o.created_at DESC
        `);
        return orders;
    },
    updateOrderStatus: async (orderId, status) => {
        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    },
    addProduct: async (productData) => {
        const { name, price, stock, category_id, description, image_url } = productData;
        const [result] = await db.query(
            'INSERT INTO products (name, price, stock, category_id, description, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, price, stock, category_id, description, image_url]
        );
        return result.insertId;
    }
};

module.exports = Admin;

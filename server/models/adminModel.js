const db = require('../config/db');

const Admin = {
    getDashboardStats: async () => {
        const [salesRows] = await db.query('SELECT SUM(total_amount) as totalRevenue FROM orders WHERE status = $1', ['Delivered']);
        const [orderRows] = await db.query('SELECT COUNT(*) as totalOrders FROM orders');
        const [productRows] = await db.query('SELECT COUNT(*) as totalProducts FROM products');
        const [lowStockProducts] = await db.query('SELECT * FROM products WHERE stock < 10 ORDER BY stock ASC');

        return {
            totalRevenue: salesRows[0].totalrevenue || 0, // PostgreSQL returns lowercase column names sometimes
            totalOrders: parseInt(orderRows[0].totalorders) || 0,
            totalProducts: parseInt(productRows[0].totalproducts) || 0,
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
        await db.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
    },
    addProduct: async (productData) => {
        const { name, price, stock, category_id, description, image_url } = productData;
        const [rows] = await db.query(
            'INSERT INTO products (name, price, stock, category_id, description, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [name, price, stock, category_id, description, image_url]
        );
        return rows[0].id;
    }
};

module.exports = Admin;

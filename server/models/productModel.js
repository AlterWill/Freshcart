const db = require('../config/db');

const Product = {
    getAll: async (params = {}) => {
        const { keyword, category, sort } = params;
        let query = 'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1';
        let queryParams = [];

        if (keyword) {
            query += ' AND p.name LIKE ?';
            queryParams.push(`%${keyword}%`);
        }

        if (category) {
            query += ' AND c.id = ?';
            queryParams.push(category);
        }

        if (sort === 'price_asc') {
            query += ' ORDER BY p.price ASC';
        } else if (sort === 'price_desc') {
            query += ' ORDER BY p.price DESC';
        } else {
            query += ' ORDER BY p.created_at DESC';
        }

        const [rows] = await db.query(query, queryParams);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?', [id]);
        return rows[0];
    }
};

module.exports = Product;

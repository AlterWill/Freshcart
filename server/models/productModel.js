const db = require('../config/db');

const Product = {
    getAll: async (params = {}) => {
        const { keyword, category, sort, page = 1, limit = 10 } = params;
        const offset = (page - 1) * limit;
        
        let queryStr = 'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1';
        let countQuery = 'SELECT COUNT(*) as total FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1';
        let queryParams = [];
        let paramIndex = 1;

        if (keyword) {
            const keywordParam = `%${keyword}%`;
            queryStr += ` AND p.name ILIKE $${paramIndex}`;
            countQuery += ` AND p.name ILIKE $${paramIndex}`;
            queryParams.push(keywordParam);
            paramIndex++;
        }

        if (category) {
            queryStr += ` AND c.id = $${paramIndex}`;
            countQuery += ` AND c.id = $${paramIndex}`;
            queryParams.push(category);
            paramIndex++;
        }

        if (sort === 'price_asc') {
            queryStr += ' ORDER BY p.price ASC';
        } else if (sort === 'price_desc') {
            queryStr += ' ORDER BY p.price DESC';
        } else if (sort === 'name_asc') {
            queryStr += ' ORDER BY p.name ASC';
        } else {
            queryStr += ' ORDER BY p.created_at DESC';
        }

        // Add pagination to main query
        queryStr += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        const finalParams = [...queryParams, parseInt(limit), parseInt(offset)];

        const [rows] = await db.query(queryStr, finalParams);
        const [countRows] = await db.query(countQuery, queryParams);
        const total = parseInt(countRows[0].total);

        return {
            products: rows,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [id]);
        return rows[0];
    }
};

module.exports = Product;

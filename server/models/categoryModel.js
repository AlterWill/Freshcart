const db = require('../config/db');

const Category = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
        return rows;
    }
};

module.exports = Category;

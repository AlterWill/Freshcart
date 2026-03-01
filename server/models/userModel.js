const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (userData) => {
        const { name, email, password, role } = userData;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role || 'customer']
        );
        return result.insertId;
    }
};

module.exports = User;

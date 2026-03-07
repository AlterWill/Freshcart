const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [id]);
        return rows[0];
    },
    create: async (userData) => {
        const { name, email, password, role } = userData;
        const [rows] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, password, role || 'customer']
        );
        if (!rows || rows.length === 0) {
            throw new Error('User creation failed: No data returned from database');
        }
        return rows[0].id;
    }
};

module.exports = User;

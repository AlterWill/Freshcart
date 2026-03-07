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
        console.log('Attempting to create user in DB:', email);
        const [rows] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, password, role || 'customer']
        );
        
        if (!rows || rows.length === 0) {
            console.error('DB Insert failed: No rows returned');
            throw new Error('User creation failed: No data returned from database');
        }
        
        const newId = rows[0].id || rows[0][0]; // Handle different driver return formats
        console.log('User created successfully with ID:', newId);
        return newId;
    }
};

module.exports = User;

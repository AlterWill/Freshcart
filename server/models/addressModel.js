const db = require('../config/db');

const Address = {
    findByUserId: async (userId) => {
        const [rows] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
        return rows;
    },
    create: async (userId, addressData) => {
        const { address, city, pincode } = addressData;
        const [result] = await db.query(
            'INSERT INTO addresses (user_id, address, city, pincode) VALUES (?, ?, ?, ?)',
            [userId, address, city, pincode]
        );
        return result.insertId;
    },
    delete: async (id, userId) => {
        const [result] = await db.query('DELETE FROM addresses WHERE id = ? AND user_id = ?', [id, userId]);
        return result.affectedRows;
    }
};

module.exports = Address;

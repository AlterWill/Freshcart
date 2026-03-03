const db = require('../config/db');

const Address = {
    findByUserId: async (userId) => {
        const [rows] = await db.query('SELECT * FROM addresses WHERE user_id = $1', [userId]);
        return rows;
    },
    create: async (userId, addressData) => {
        const { address, city, pincode } = addressData;
        const [rows] = await db.query(
            'INSERT INTO addresses (user_id, address, city, pincode) VALUES ($1, $2, $3, $4) RETURNING id',
            [userId, address, city, pincode]
        );
        return rows[0].id;
    },
    delete: async (id, userId) => {
        const [rows, res] = await db.query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [id, userId]);
        return res.rowCount;
    }
};

module.exports = Address;

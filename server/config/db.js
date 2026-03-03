const { Pool } = require('pg');
require('dotenv').config();

// Use a connection URI if provided (common on PaaS like Vercel/Render)
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
    : new Pool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smartmart',
        port: process.env.DB_PORT || 5432,
    });

// Helper for mysql-like query interface (returns {rows})
const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // console.log('executed query', { text, duration, rows: res.rowCount });
    return [res.rows, res]; // Return in [rows, result] format to match mysql2 usage as much as possible
};

// Helper for transactions to match mysql2 getConnection()
const getConnection = async () => {
    const client = await pool.connect();
    
    // Monkey-patch to match mysql2 connection.query and transaction methods
    const originalQuery = client.query.bind(client);
    client.query = async (text, params) => {
        const res = await originalQuery(text, params);
        return [res.rows, res];
    };
    
    client.beginTransaction = () => client.query('BEGIN');
    client.commit = () => client.query('COMMIT');
    client.rollback = () => client.query('ROLLBACK');
    client.release = client.release.bind(client);
    
    return client;
};

module.exports = {
    pool,
    query,
    getConnection
};

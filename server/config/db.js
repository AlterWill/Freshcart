const mysql = require('mysql2/promise');
require('dotenv').config();

// Use a connection URI if provided (common on PaaS like Vercel/PlanetScale)
const pool = process.env.DATABASE_URL
    ? mysql.createPool(process.env.DATABASE_URL)
    : mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smartmart',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

module.exports = pool;

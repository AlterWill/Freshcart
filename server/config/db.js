require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

let pool;
let query;
let getConnection;

// Prefer POSTGRES_URL (Vercel standard) or DATABASE_URL (Generic standard)
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (connectionString) {
    console.log('Using remote database connection');
    
    // Check if we should use the serverless driver (HTTP) or standard pool (TCP)
    // For Vercel Serverless Functions, @neondatabase/serverless is often better for cold starts
    // But for full compatibility with existing transaction logic, standard pg with SSL is safer if not using WebSocket.
    // The user installed @neondatabase/serverless, so we use it for queries.
    
    const sql = neon(connectionString);

    query = async (text, params) => {
        // console.log('Executing query:', text);
        const start = Date.now();
        try {
            const rows = await sql(text, params);
            const duration = Date.now() - start;
            return [rows, { rowCount: rows.length }];
        } catch (err) {
            console.error('Database Query Error:', err);
            throw err;
        }
    };

    // Compatibility layer for transactions
    getConnection = async () => {
        const client = {
            query: async (text, params) => {
                const rows = await sql(text, params);
                return [rows, { rowCount: rows.length }];
            },
            // HTTP driver doesn't support interactive transactions.
            // These are no-ops to prevent crashes, but strict transactional integrity is not guaranteed in this mode.
            beginTransaction: async () => { },
            commit: async () => { },
            rollback: async () => { },
            release: () => { }
        };
        return client;
    };

} else {
    console.log('Using local database connection');
    // Local Development
    pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smartmart',
        port: process.env.DB_PORT || 5432,
    });

    query = async (text, params) => {
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        return [res.rows, res];
    };

    getConnection = async () => {
        const client = await pool.connect();
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
}

module.exports = {
    query,
    getConnection
};

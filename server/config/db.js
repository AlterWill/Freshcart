require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

let pool;
let query;
let getConnection;
let connectionMode = '';

// Prefer POSTGRES_URL (Vercel standard) or DATABASE_URL (Generic standard)
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (connectionString && typeof connectionString === 'string' && connectionString.trim().length > 0) {
    console.log('Database connection string detected.');
    try {
        // Simple validation
        if (!connectionString.startsWith('postgres://') && !connectionString.startsWith('postgresql://')) {
            throw new Error('Invalid connection string format. Must start with postgres:// or postgresql://');
        }
        
        // Attempt to use Neon Serverless Driver
        console.log('Attempting to connect via Neon Serverless Driver...');
        const sql = neon(connectionString);
        connectionMode = 'remote (Neon HTTP)';

        query = async (text, params) => {
            try {
                const rows = await sql.query(text, params);
                return [rows, { rowCount: rows.length }];
            } catch (err) {
                console.error('DATABASE_QUERY_ERROR:', err.message);
                throw err;
            }
        };

        // Compatibility layer for transactions
        getConnection = async () => {
            return {
                query: async (text, params) => {
                    const rows = await sql.query(text, params);
                    return [rows, { rowCount: rows.length }];
                },
                beginTransaction: async () => { /* No-op for HTTP */ },
                commit: async () => { /* No-op */ },
                rollback: async () => { /* No-op */ },
                release: () => { /* No-op */ }
            };
        };

        console.log('✅ Configured to use Neon Serverless Driver');

    } catch (e) {
        console.error("⚠️ Failed to initialize Neon driver, falling back to standard pg pool. Error:", e.message);
        
        // Fallback to standard pg Pool with SSL (common for other cloud providers or if neon fails)
        connectionMode = 'remote (Standard Pool)';
        pool = new Pool({
            connectionString: connectionString,
            ssl: { rejectUnauthorized: false } // Required for most cloud DBs
        });

        query = async (text, params) => {
            const start = Date.now();
            const res = await pool.query(text, params);
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
        console.log('✅ Configured to use Standard PostgreSQL Pool (Fallback)');
    }

} else {
    connectionMode = 'local PostgreSQL';
    console.log('Using local database connection');
    
    // Local Development
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smartmart',
        port: parseInt(process.env.DB_PORT) || 5432,
    };

    pool = new Pool(dbConfig);

    query = async (text, params) => {
        const start = Date.now();
        const res = await pool.query(text, params);
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
    getConnection,
    connectionMode
};

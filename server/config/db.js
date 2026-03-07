require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

let pool;
let query;
let getConnection;
let connectionMode = '';

// Prefer POSTGRES_URL (Vercel standard) or DATABASE_URL (Generic standard)
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (connectionString) {
    // console.log('Using remote database connection'); // Debugging
    connectionMode = 'remote (Neon)';

    try {
        // Validate URL format before passing to neon()
        new URL(connectionString); 
        
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
                beginTransaction: async () => { },
                commit: async () => { },
                rollback: async () => { },
                release: () => { }
            };
            return client;
        };
    } catch (e) {
        console.error("Invalid Database Connection String:", e.message);
        throw new Error("Invalid Database Connection String provided in environment variables (POSTGRES_URL or DATABASE_URL).");
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

    // Handle pool errors
    pool.on('error', (err) => {
        console.error('Unexpected error on idle client:', err);
        if (err.code === 'ECONNREFUSED') {
            console.error(`\n⚠️  DATABASE CONNECTION FAILED\n` +
                `Cannot connect to PostgreSQL at ${dbConfig.host}:${dbConfig.port}\n\n` +
                `To fix:\n` +
                `1. Ensure PostgreSQL is running: sudo systemctl start postgresql\n` +
                `2. Create database if needed: sudo -u postgres createdb ${dbConfig.database}\n` +
                `3. Initialize schema: sudo -u postgres psql -d ${dbConfig.database} < schema.sql\n`);
        }
    });

    query = async (text, params) => {
        try {
            const start = Date.now();
            const res = await pool.query(text, params);
            const duration = Date.now() - start;
            return [res.rows, res];
        } catch (err) {
            if (err.code === 'ECONNREFUSED') {
                console.error(`\n⚠️  DATABASE CONNECTION FAILED\n` +
                    `Cannot connect to PostgreSQL at ${dbConfig.host}:${dbConfig.port}\n\n` +
                    `To fix:\n` +
                    `1. Ensure PostgreSQL is running: sudo systemctl start postgresql\n` +
                    `2. Create database if needed: sudo -u postgres createdb ${dbConfig.database}\n` +
                    `3. Initialize schema: sudo -u postgres psql -d ${dbConfig.database} < schema.sql\n`);
            } else if (err.code === '3D000') {
                console.error(`\n⚠️  DATABASE DOES NOT EXIST: "${dbConfig.database}"\n` +
                    `Create it with: sudo -u postgres createdb ${dbConfig.database}\n` +
                    `Then initialize schema: sudo -u postgres psql -d ${dbConfig.database} < schema.sql\n`);
            }
            throw err;
        }
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

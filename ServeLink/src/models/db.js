import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing. Check your .env file.');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Database connected successfully!');
        console.log('Database time:', result.rows[0].now);

        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
}

export default pool;
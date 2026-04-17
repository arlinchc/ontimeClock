module.exports = pool;

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER || process.env.DB_USER || 'postgres',
    host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
    database: process.env.PGDATABASE || process.env.DB_NAME || 'onTimeClock',
    password: process.env.PGPASSWORD || process.env.DB_PASSWORD || 'postgres',
    port: Number(process.env.PGPORT || process.env.DB_PORT || 5432),
});

module.exports = pool;

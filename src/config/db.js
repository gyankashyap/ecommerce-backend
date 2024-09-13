const dotenv = require('dotenv');
const { Client } = require('pg');

const dbClient = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});

dbClient.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));
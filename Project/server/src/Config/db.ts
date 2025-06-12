// Creazione di una connessione al database MySQL tramite mysql2
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'appuser', // Default user if not set
  password: process.env.DB_PASSWORD || 'apppassword', // Default password if not set
  database: process.env.DB_NAME || 'food_supply_chain', // Default database if not set
});
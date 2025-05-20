"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Creazione di una connessione al database MySQL tramite mysql2
var mysql = require('mysql2/promise');
var dotenv = require('dotenv');
dotenv.config();
exports.db = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

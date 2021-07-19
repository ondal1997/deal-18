require('dotenv').config();
const configs = require('../configs/config.dev.json');

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || configs.database.host,
  user: process.env.DB_USER || configs.database.user,
  password: process.env.DB_PASSWORD || configs.database.password,
  database: process.env.DB_DB || configs.database.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();

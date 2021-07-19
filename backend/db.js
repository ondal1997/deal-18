require('dotenv').config();
const configs = require('../configs/config.dev.json');

const mysql = require('mysql2');
const { INSERT_PRODUCT } = require('./query/product');
const { INSERT_CHAT } = require('./query/chat');

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

//insert product sample
/*
const k = [
  {
    title: 'test1',
    price: 10000,
    description: 'test1',
    town: '강남',
    user_id: 'kyle',
    category: '디지털기기',
  },
  {
    title: 'test2',
    price: 158000,
    description: 'test2',
    town: '역삼동',
    user_id: 'woowa',
    category: '디지털기기',
  },
  {
    title: 'test3',
    price: 10000,
    description: 'test3',
    town: '강남',
    user_id: 'kyle',
    category: '생활가전',
  },
  {
    title: 'test4',
    price: 158000,
    description: 'test4',
    town: '역삼동',
    user_id: 'woowa',
    category: '생활가전',
  },
  {
    title: 'test5',
    price: 10000,
    description: 'test5',
    town: '강남',
    user_id: 'kyle',
    category: '생활가전',
  },
  {
    title: 'test6',
    price: 158000,
    description: 'test6',
    town: '역삼동',
    user_id: 'woowa',
    category: '유아동',
  },
];

for (let x of k) {
  pool.query(INSERT_PRODUCT(x));
}



 pool.query(INSERT_CHAT({ product_id: 92, seller_id: 'woowa', customer_id: 'kyle' }));

 */

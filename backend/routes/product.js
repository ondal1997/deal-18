const pool = require('../db');
const express = require('express');
const { GET_ALL_PRODUCT, GET_USER_PRODUCT } = require('../query/product');
const router = express.Router();

//GET:product list
router.get('/products', async (req, res) => {
  const DEFAULT_SIZE = 10;
  const { userId } = req.session;
  const { backOf, category, ownerId, town } = req.query;
  try {
    const [productRows] = await pool.query(GET_ALL_PRODUCT({ userId, category, town }));
    const products = productRows.map((productRow) => {
      if (productRow.isLiked) return { ...productRow, isLiked: true };
      return { ...productRow, isLiked: false };
    });
    res.json({ success: true, products });
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.get('/products/:productId', async (req, res) => {
  // const { userId } = req.session;
  // const { productId } = req.params;
  // const [productRows] = await pool.query('select * from product where productId=?', [productId]);
  // const conn = await pool.getConnection();
  // try {
  //   await conn.beginTransaction(); // 트랜잭션 적용 시작
  //   await conn.query('select count(*) from town where user_id=?', [userId]);
  //   await conn.query('insert into town (user_id, name) values (?, ?)', [userId, town]);
  //   await conn.commit(); // 커밋
  //   res.json({ userId, towns: [town] });
  // } catch {
  //   await conn.rollback(); // 롤백
  //   res.status(500).json({ error: 'DB 실패' });
  // } finally {
  //   conn.release(); // conn 회수
  // }
});

/*
  SELECT a.id, COUNT(b.id) FROM TABLE_A a LEFT JOIN TABLE_B b ON a.id = b.id WHERE 1 GROUP BY a.id ORDER BY COUNT(b.id)

  watchCount++
  commentCount: 3,
  likeCount: 2,

  imgUrls

  isLiked
  isYours
*/

module.exports = router;

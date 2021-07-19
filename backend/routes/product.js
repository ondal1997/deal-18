const pool = require('../db');
const express = require('express');
const router = express.Router();

//GET:product list
router.get('/products', async (req, res) => {
  const DEFAULT_SIZE = 10;
  const { backOf, category, ownerId, town } = req.query;

  try {
    const [productRows] = await pool.query(`select * from product `, [userId, town]);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.get('/products/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  const [productRows] = await pool.query('select * from product where productId=?', [productId]);

  `
    select a.*, count(b.*) as likeCount, count(c.*), i.img_url as commentCount
    from product a
    inner join (select product_id, img_url from product_img group by product_id) as i on a.id=i.proudct_id
    left join user_like b on a.id=b.product_id
    left join chat c on a.id=c.product_id
    where a.id=?
    `;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // 트랜잭션 적용 시작
    await conn.query('select count(*) from town where user_id=?', [userId]);
    await conn.query('insert into town (user_id, name) values (?, ?)', [userId, town]);
    await conn.commit(); // 커밋
    res.json({ userId, towns: [town] });
  } catch {
    await conn.rollback(); // 롤백
    res.status(500).json({ error: 'DB 실패' });
  } finally {
    conn.release(); // conn 회수
  }
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

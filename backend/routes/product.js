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
    const productImgs = await pool.query(GET_PRODUCT_IMG({}));
    res.json({ success: true, products });
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.get('/products/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  try {
    await pool.query('update product set watch_count = watch_count + 1', [productId]);
    const [productRows] = await pool.query(
      `
          select a.id, a.title, a.price, a.description, a.town, a.user_id as userId, a.state, a.category, a.watch_count as watchCount, a.created_date as createdDate,
              i.imgUrls, b.likeCount, c.commentCount 
          from
              product as a
              left join (select product_id, JSON_ARRAYAGG(img_url) as imgUrls from product_img group by product_id) as i
                  on a.id = i.product_id
              left join (select product_id, count(*) as likeCount from user_like group by product_id) as b on a.id = b.product_id
              left join (select product_id, count(*) as commentCount from chat group by product_id) as c on a.id = c.product_id
          where
              a.id=?
      `,
      [userId],
    );

    const product = productRows[0];
    if (!product) {
      res.status(404).json({ error: '자료가 없습니다.' });
      return;
    }

    product.isYours = product.userId === userId;
    const [userLikeRows] = await pool.query('select * from user_like where user_id=?', [userId]);
    product.isLiked = userLikeRows.length;
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.error(err);
  }
});

module.exports = router;

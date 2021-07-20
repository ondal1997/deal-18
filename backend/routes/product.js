const pool = require('../db');
const express = require('express');
const {
  GET_ALL_PRODUCT,
  GET_USER_PRODUCT,
  INCREASE_PRODUCT_WATCH_COUNT,
  GET_PRODUCT_DETAIL,
} = require('../query/product');
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

// 상풍 조회(상세)
router.get('/products/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  try {
    await pool.query(INCREASE_PRODUCT_WATCH_COUNT({ productId }));
    const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));

    const product = productRows[0];
    if (!product) {
      res.status(404).json({ error: '자료가 없습니다.' });
      return;
    }

    product.isYours = product.userId === userId;
    const [userLikeRows] = await pool.query('select * from user_like where user_id=?', [userId]);
    product.isLiked = !!userLikeRows.length;
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.error(err);
  }
});

const authenticationValidator = async (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(401).json({ error: '로그인이 필요합니다.' });
    return;
  }

  next();
};

// 상품 생성
router.post('/products', authenticationValidator, async (req, res) => {
  const { userId } = req.session;

  let { title, category, description, town, state, price, imgUrls } = req.body;

  state = state || '판매중';
  // TODO: state, category 범위체크

  if (!imgUrls.length) {
    res.status(400).json({ error: '최소 1개의 이미지가 필요합니다.' });
    return;
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [insertResult] = await conn.query(`
    insert into product (title, category, description, town, state, price, user_id, product_img_url)
    values ('${title}', '${category}', '${description}', '${town}', '${state}', '${price}', '${userId}', '${imgUrls[0]}')
    `);

    const productId = insertResult.insertId;

    await conn.query(`
    insert into product_img (img_url, product_id)
    values ${imgUrls.map((imgUrl) => `('${imgUrl}', ${productId})`)}
    `);
    conn.commit();

    const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));
    const product = productRows[0];
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 생성에 실패하였습니다.' });
    await conn.rollback();
  } finally {
    conn.release();
  }
});

// 상품 수정
router.post('/products/:productId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
});

// 상품 삭제
router.delete('/products/:productId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
});

module.exports = router;

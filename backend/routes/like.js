const pool = require('../db');
const express = require('express');
const { ADD_LIKE, DELETE_LIKE, GET_LIKE_PRODUCT } = require('../query/like');
const router = express.Router();

router.get('/like-products', async (req, res) => {
  const { userId } = req.session;
  const { size } = req.query;
  if (!userId) {
    res.json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  try {
    const [productRows] = await pool.query(GET_LIKE_PRODUCT({ size, userId }));
    console.log(productRows);
    const products = productRows.map((productRow) => ({ ...productRow, isLiked: true }));

    res.json({ products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.post('/like/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;
  if (!userId) {
    res.json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  try {
    await pool.query(ADD_LIKE({ userId, productId }));

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 에러' });
  }
});

router.delete('/like/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  if (!userId) {
    res.json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  try {
    await pool.query(DELETE_LIKE({ userId, productId }));

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 에러' });
  }
});

module.exports = router;

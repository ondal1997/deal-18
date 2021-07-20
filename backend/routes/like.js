const pool = require('../db');
const express = require('express');
const { ADD_LIKE, DELETE_LIKE } = require('../query/like');
const router = express.Router();

router.post('/like/:productID', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  if (!userId) {
    res.json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  try {
    await pool(ADD_LIKE({ userId, productId }));

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 에러' });
  }
});

router.delete('/like/:productID', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  if (!userId) {
    res.json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  try {
    await pool(DELETE_LIKE({ userId, productId }));

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 에러' });
  }
});

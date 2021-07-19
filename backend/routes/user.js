const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { userId, town } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // 트랜잭션 적용 시작
    await conn.query('insert into user (id) values (?)', [userId]);
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

router.post('/login', async (req, res) => {
  const { userId } = req.body;

  try {
    const [userRows] = await pool.query('select id from user where id=?', [userId]);
    if (userRows.length) {
      // user 존재
      const [townRows] = await pool.query('select name from town where user_id=?', [userId]);
      const towns = townRows.map((townRow) => townRow.name);
      req.session.userId = userId;
      res.json({ userId, towns });
    } else {
      res.status(400).json({ error: '해당 아이디가 없습니다.' });
    }
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.post('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get('/me', async (req, res) => {
  const { userId } = req.session;
  const DEFAULT_TOWNS = ['역삼동'];

  if (!userId) {
    res.json({ userId: null, towns: DEFAULT_TOWNS });
  }

  try {
    const [townRows] = await pool.query('select name from town where user_id=?', [userId]);
    const towns = townRows.map((townRow) => townRow.name);
    res.json({ userId, towns });
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

module.exports = router;

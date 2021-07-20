const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { userId, town } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // 트랜잭션 적용 시작
    // 쿼리 사이에 다른 쿼리가 삽입되는 것을 막는다 + 첫번째 쿼리만 적용되는 것을 막는다.
    await conn.query('insert into user (id, town_name) values (?,?)', [userId, town]);
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
    const [userRows] = await pool.query('select id, town_name as primaryTown from user where id=?', [userId]);
    if (userRows.length) {
      // user 존재
      const [townRows] = await pool.query('select id, name from town where user_id=?', [userId]);
      const towns = townRows.map((townRow) => townRow.name);
      req.session.userId = userId;
      res.json({ userId, primaryTown: userRows[0].primaryTown, towns });
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
    return;
  }

  try {
    const [userRows] = await pool.query('select id, town_name as primaryTown from user where id=?', [userId]);
    const [townRows] = await pool.query('select id, name from town where user_id=?', [userId]);
    const towns = townRows.map((townRow) => townRow.name);
    res.json({ userId, primaryTown: userRows[0].primaryTown, towns });
  } catch {
    res.status(500).json({ error: 'DB 실패' });
  }
});

//대표 동네 변경 API
router.put('/user', async (req, res) => {
  const { userId } = req.session;
  const { town } = req.body;
  if (!userId) {
    res.status(401).json({ error: '로그인 해주세요' });
    return;
  }

  try {
    //town에 있는지 체크
    //user의 town_name 바꾸기
    const [townRows] = await pool.query('SELECT * FROM town WHERE name=? AND user_id=?', [town, userId]);
    if (!townRows.length) {
      res.status(404).json({ error: '존재하지 않는 동네입니다.' });
      return;
    }

    const [updateResult] = await pool.query(`UPDATE user SET town_name=?`, [town]);
    const [userRows] = await pool.query(`SELECT town_name FROM user WHERE id=?`, [userId]);
    res.json({ userId, primaryTown: userRows[0].town_name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

module.exports = router;

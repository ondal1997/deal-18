const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/towns', async (req, res) => {
  const { userId } = req.session;
  const conn = await pool.getConnection();
  const { town } = req.body;

  if (!userId) {
    res.status(401).json({ error: '로그인 해주세요' });
    return;
  }

  try {
    //TODO 개수 체크를 어떻게할까
    await conn.beginTransaction(); // 트랜잭션 적용 시작
    const [count] = await conn.query('select count(*) from town where user_id=?', [userId]);
    if (count[0][`count(*)`] >= 2) {
      await conn.rollback(); // 롤백
      res.status(400).json({ error: '최대 2개의 지역만 추가할 수 있습니다.' });
      return;
    }
    await conn.query('insert into town (user_id, name) values (?, ?)', [userId, town]);
    await conn.commit(); // 커밋
  } catch (err) {
    console.log(err);
    await conn.rollback(); // 롤백
    res.status(500).json({ error: 'DB 실패' });
  } finally {
    conn.release(); // conn 회수
  }

  try {
    const [townRows] = await pool.query('select * from town where user_id=?', [userId]);
    const towns = townRows.map((townRow) => townRow.name);
    res.json({ success: true, towns });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

router.delete('/towns', async (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(401).json({ error: '로그인 후 이용해주세요.' });
    return;
  }

  const { town } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // 트랜잭션 적용 시작
    const [count] = await conn.query('select count(*) from town where user_id=?', [userId]);

    if (count[0][`count(*)`] <= 1) {
      await conn.rollback(); // 롤백
      res.status(400).json({ error: '최소 1개의 동네가 필요합니다.' });
      return;
    }

    await conn.query('delete from town where user_id=? and name=?', [userId, town]);
    await conn.commit(); // 커밋
  } catch (err) {
    console.error(err);
    await conn.rollback(); // 롤백
    res.status(500).json({ error: 'DB 실패' });
  } finally {
    conn.release(); // conn 회수
  }

  try {
    const [townRows] = await pool.query('select * from town where user_id=?', [userId]);
    const towns = townRows.map((townRow) => townRow.name);
    res.json({ userId, towns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

module.exports = router;

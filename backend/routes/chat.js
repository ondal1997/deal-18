const pool = require('../db');
const express = require('express');
const authenticationValidator = require('../middleware/auth');
const { GET_PRODUCT_BY_CHAT, GET_CHAT_LOG, UPDATE_UNCHECK_CHAT, INSERT_CHAT_LOG } = require('../query/chat');
const router = express.Router();

// 채팅방 조회(상세) 본인만 조회 가능
router.get('/chats/:chatId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { chatId } = req.params;

  try {
    //조회
    const [productRows] = await pool.query(GET_PRODUCT_BY_CHAT({ chatId }));
    const [chatsRows] = await pool.query(GET_CHAT_LOG({ chatId }));
    const chatDetail = productRows[0];
    chatDetail.chatting = chatsRows;

    // uncheck 초기화
    await pool.query(UPDATE_UNCHECK_CHAT({ userId }));

    res.json({ chatDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

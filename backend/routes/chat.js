const pool = require('../db');
const express = require('express');
const authenticationValidator = require('../middleware/auth');
const {
  GET_PRODUCT_BY_CHAT,
  GET_CHAT_LOG,
  UPDATE_UNCHECK_CHAT,
  INSERT_CHAT_LOG,
  DELETE_CHAT,
  GET_CHAT_PARTICIPATE_ID,
  ADD_UNCHECK_COUNT,
} = require('../query/chat');
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
    const [[{ sellerId, customerId }]] = await pool.query(GET_CHAT_PARTICIPATE_ID({ chatId }));
    const isSeller = userId === sellerId;
    const isCustomer = userId === customerId;
    await pool.query(UPDATE_UNCHECK_CHAT({ isSeller, isCustomer }));

    res.json({ chatDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

// 채팅방 삭제
router.delete('/chats/:chatId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { chatId } = req.params;

  try {
    await pool.query(DELETE_CHAT({ chatId, userId }));
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});
// 채팅 메세지 생성
router.post('/chats/:chatId', authenticationValidator, async (req, res) => {
  try {
    const { userId } = req.session;
    const { message } = req.body;
    const { chatId } = req.params;
    //채팅 추가
    await pool.query(INSERT_CHAT_LOG({ message, chatId, userId }));
    //uncheck+1
    const [[{ sellerId, customerId }]] = await pool.query(GET_CHAT_PARTICIPATE_ID({ chatId }));
    const isSeller = userId === sellerId;
    const isCustomer = userId === customerId;
    await pool.query(ADD_UNCHECK_COUNT({ isSeller, isCustomer }));

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

module.exports = router;

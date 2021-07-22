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
    await pool.query(UPDATE_UNCHECK_CHAT({ chatId, isSeller, isCustomer }));

    res.json(chatDetail);
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
    await pool.query(ADD_UNCHECK_COUNT({ chatId, isSeller, isCustomer }));

    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

// 채팅방 리스트 조회 (상품 연관, 상품 소유자만 사용 가능)
router.get('/products/:productId/chats', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  // 상품 존재 여부 및 권한 체크
  const [productRows] = await pool.query('select * from product where id=?', [productId]);
  const product = productRows[0];
  if (!product) {
    res.status(404).json({ error: '자료가 없습니다.' });
    return;
  }
  if (product.user_id !== userId) {
    res.status(403).json({ error: '권한이 없습니다.' });
    return;
  }

  // 채팅방 가져오기
  try {
    const [chats] = await pool.query(
      `select c.id, customer_id as userName, uncheck_count_seller as uncheckedMsgCount, product_img_url as imgUrl, cl.message, cl.created_date as createdDate
        from
            chat as c
            left join product as p on c.product_id = p.id
            left join (select message, created_date, chat_id, id from chat_log WHERE id=(select max(id) from chat_log)) as cl on c.id = cl.chat_id
        where
            product_id=${productId}
        `,
    );

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'DB 실패' });
    console.error(err);
  }
});

// 채팅방 리스트 조회 (유저 연관, 본인 채팅방만 조회 가능)
router.get('/chats', authenticationValidator, async (req, res) => {
  const { userId } = req.session;

  // 채팅방 가져오기
  try {
    const [chatRows] = await pool.query(
      `select c.id, seller_id as sellerId, customer_id as customerId, uncheck_count_seller as uncheckedSellerMsgCount, uncheck_count_customer as uncheckedCustomerMsgCount, product_img_url as imgUrl, cl.message, cl.created_date as createdDate
        from
            chat as c
            left join product as p on c.product_id = p.id
            left join (select message, created_date, chat_id, id from chat_log WHERE id=(select max(id) from chat_log)) as cl on c.id = cl.chat_id
        where
            seller_id='${userId}' OR customer_id='${userId}'
        `,
    );

    // 변환
    const chats = chatRows.map(
      ({
        id,
        sellerId,
        customerId,
        uncheckedSellerMsgCount,
        uncheckedCustomerMsgCount,
        imgUrl,
        message,
        createdDate,
      }) => {
        let userName;
        let uncheckedMsgCount;
        if (sellerId === userId) {
          userName = customerId;
          uncheckedMsgCount = uncheckedSellerMsgCount;
        } else {
          userName = sellerId;
          uncheckedMsgCount = uncheckedCustomerMsgCount;
        }
        return {
          id,
          userName,
          uncheckedMsgCount,
          imgUrl,
          message,
          createdDate,
        };
      },
    );

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'DB 실패' });
    console.error(err);
  }
});

// 채팅방 생성
router.post('/products/:productId/chats', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  // 상품 존재 여부 체크
  const [productRows] = await pool.query('select * from product where id=?', [productId]);
  const product = productRows[0];
  if (!product) {
    res.status(404).json({ error: '자료가 없습니다.' });
    return;
  }

  // 기존채팅방 존재 체크
  const [chatRows] = await pool.query('select * from chat where product_id=? AND customer_id=?', [productId, userId]);
  if (chatRows.length) {
    res.json(chatRows[0]);
    return;
  }

  try {
    await pool.query('insert into chat (product_id, seller_id, customer_id) values (?, ?, ?)', [
      productId,
      product.user_id,
      userId,
    ]);

    const [chatRows] = await pool.query('select * from chat where product_id=? AND customer_id=?', [productId, userId]);
    if (chatRows.length) {
      res.json(chatRows[0]);
      return;
    }

    res.json(chatRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

module.exports = router;

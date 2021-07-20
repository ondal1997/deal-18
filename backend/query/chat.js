const INSERT_CHAT = ({ product_id, seller_id, customer_id }) => {
  return `
        INSERT INTO chat 
        (product_id,seller_id,customer_id,uncheck_count_seller,uncheck_count_customer)
        VALUES (${product_id},'${seller_id}','${customer_id}',0,0)
    `;
};

const GET_PRODUCT_BY_CHAT = ({ chatId }) => {
  return `
    SELECT title as productName, user_id as userName, product_img_url as imgUrl, price, state
    FROM product as p JOIN (SELECT product_id FROM chat WHERE chat.id='${chatId}') as c 
    ON p.id=c.product_id
  `;
};

const GET_CHAT_LOG = ({ chatId }) => {
  return `
    SELECT user_id as userName, message, created_date as createdDate
    FROM chat_log WHERE chat_id='${chatId}' ORDER BY created_date ASC
  `;
};

const UPDATE_UNCHECK_CHAT = ({ isSeller, isCustomer }) => {
  if (isSeller) return ` UPDATE chat SET uncheck_count_seller=0`;

  if (isCustomer) return `UPDATE chat SET uncheck_count_customer=0`;

  return '';
};

const DELETE_CHAT = ({ userId, chatId }) => {
  return `
    DELETE FROM chat 
    WHERE id='${chatId}' AND (seller_id='${userId}' OR customer_id='${userId}')
  `;
};

const INSERT_CHAT_LOG = ({ userId, chatId, message }) => {
  return `
    INSERT INTO chat_log 
    (message,user_id,chat_id,created_date)
    VALUES ('${message}','${userId}','${chatId}',now())
  `;
};

const GET_CHAT_PARTICIPATE_ID = ({ chatId }) => {
  return `
    SELECT seller_id as sellerId, customer_id as customerId 
    FROM chat WHERE id='${chatId}'
  `;
};

const ADD_UNCHECK_COUNT = ({ isSeller, isCustomer }) => {
  if (isCustomer) return `UPDATE chat SET uncheck_count_seller = uncheck_count_seller +1`;
  if (isSeller) return `UPDATE chat SET uncheck_count_customer = uncheck_count_customer +1`;

  return '';
};

module.exports = {
  GET_PRODUCT_BY_CHAT,
  INSERT_CHAT,
  GET_CHAT_LOG,
  UPDATE_UNCHECK_CHAT,
  INSERT_CHAT_LOG,
  DELETE_CHAT,
  GET_CHAT_PARTICIPATE_ID,
  ADD_UNCHECK_COUNT,
};
